import { db } from "src/server/db";
import { auth } from "@clerk/nextjs/server";
import { posts } from "src/server/db/schema";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageModal from "@/components/modals/ImageModal";
import CreatePostModal from "@/components/modals/CreatePostModal";
import UserDisplay from "@/components/UserDisplay";
import ActionBar from "@/components/posts/ActionBar";
import CommentsSection from "@/components/posts/CommentsSection";

import { Ellipsis } from "lucide-react";

import { format } from "date-fns";

export const dynamic = "force-dynamic"; // force dynamic reload

export default async function Feed() {
  const { userId } = auth();
  console.log(posts);
  console.log(userId);

  let posteos;
  if (userId) {
    posteos = await db.query.posts.findMany({
      with: { comments: true },
    });
  } else {
    posteos = await db.query.posts.findMany({
      with: { comments: true },
    });
  }

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

            <ActionBar postDate={format(new Date(post.createdAt), 'PPpp')} />

            <CommentsSection comments={post.comments} />

          </div>
        ))}
      </div>
    </main>
  );
}
