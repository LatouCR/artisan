import { db } from "src/server/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { posts } from "src/server/db/schema";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageModal from "@/components/modals/ImageModal";
import CreatePostModal from "@/components/modals/CreatePostModal";
import UserDisplay from "@/components/UserDisplay";
import ActionBar from "@/components/posts/ActionBar";

import { Ellipsis } from "lucide-react";

import { format } from "date-fns";
import { Suspense } from "react";
import CommentsSection from "@/components/posts/CommentsSection";

export const dynamic = "force-dynamic";

export default async function Feed() {
  const { userId } = auth();

  let userName = "Anonymous";
  if (userId) {
    const user = await clerkClient.users.getUser(userId);
    userName = user.username ?? "Anonymous";
  }

  const posteos = await db.query.posts.findMany({
    with: { comments: true },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
      <div className="flex items-center justify-center w-full flex-col">
        <div className="my-2">
          <CreatePostModal />
        </div>

        {posteos.map((post) => (
          <div
            key={post.id}
            className="max-w-post w-full h-auto overflow-hidden bg-white rounded-sm my-2 border-neutral-400/70 border">

            <UserDisplay userId={post.userId} userName={post.userName}>
              <div className="flex items-center justify-center text-neutral-300 hover:text-action cursor-pointer">
                <Ellipsis size={16} />
              </div>
            </UserDisplay>

            <div className="w-full mb-2">
              <div className="flex items-center px-3 text-justify mb-2">
                <p className="text-base">
                  {post.text}
                </p>
              </div>
              {post.imageUrl && (
                <AspectRatio ratio={3 / 2} className="bg-muted">
                  <ImageModal imageUrl={post.imageUrl} altText={"Post Image"} />
                </AspectRatio>
              )}
            </div>

            <ActionBar
              postId={post.id}
              postDate={post.createdAt}
              userId={userId}
              userName={userName}
              commentsCount={post.comments.length}
            />

            <Suspense fallback={<div>Loading comments...</div>}>
              <CommentsSection comments={post.comments} />
            </Suspense>

          </div>
        ))}
      </div>
    </main>
  );
}
