import { db } from "src/server/db";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { posts } from "src/server/db/schema";
import { redirect } from "next/navigation";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageModal from "@/components/modals/ImageModal";
import CreatePostModal from "@/components/modals/CreatePostModal";
import ActionBar from "@/components/posts/ActionBar";
import UserDisplay from "@/components/UserDisplay";
import UserImg from "@/components/UserImg";
import MoreActions from "@/components/MoreActions";

import { Heart, Reply, TriangleAlert } from "lucide-react";

import { format } from "date-fns";

export const dynamic = "force-dynamic"; // force dynamic reload

export default async function Feed() {

  const { userId } = auth();
  const CurrentUser = await currentUser();
  const currentId = CurrentUser?.id;

  if (!userId) return redirect("/signin");
  const user = await clerkClient.users.getUser(userId);

  let posteos;
  if (userId) {
    posteos = await db.query.posts.findMany({
      where: eq(posts.userId, userId),
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

        <div className="my-2 w-full flex justify-center">
          <CreatePostModal />
        </div>

        {posteos.map((post) => (
          <div
            key={post.id}
            className="max-w-post w-full h-auto overflow-hidden bg-white rounded-lg my-2 border-neutral-400/70 border">

            <UserDisplay
              userId={post.userId}
              userName={post.userName}
              jobPosition={(user?.unsafeMetadata as { jobPosition?: string })?.jobPosition}
            >
              <MoreActions friendId={post.userId} currentUser={currentId} userName={post.userName} />
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
              postDate={format(new Date(post.createdAt), 'PPpp')}
              postId={post.id}
              userId={userId}
              userName={user.username ?? "Unknown"}
              commentsCount={post.comments.length}
            />

            {post.comments.length > 0 && (
              <div className="px-4 pb-2 flex justify-between text-black/40">
                <div className="flex gap-4 hover:cursor-pointer">
                  <p className="font-semibold">view replies</p>
                </div>
              </div>
            )}

            {post.comments.map((comment) => (
              <div className="flex flex-col w-full my-2" key={comment.id}>

                <div className="flex w-full px-2 gap-2">
                  <UserImg userId={comment.userId} className="w-12 h-12" />
                  <div id="post-comment">
                    <div className="w-full leading-5">
                      <h2 className="font-semibold">{comment.userName}</h2>
                      <p className="text-xs text-slate-400">Job Position</p>
                    </div>
                    <div className=" max-w-xl">
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  </div>
                </div>

                <div className="px-4 flex justify-between text-black/40">
                  <div className="flex gap-4 hover:cursor-pointer">
                    <div>---</div>
                    <p className="font-semibold">view replies</p>
                  </div>
                  <div className="flex gap-6">
                    <span className="flex gap-2 hover:text-teal-700 cursor-pointer items-center my-auto">
                      <p className="text-black/20">Reply</p>
                      <Reply strokeWidth={3} className="text-slate-400 hover:text-teal-700" />
                    </span>
                    <span className="flex gap-2 text-black/40 hover:text-teal-700 cursor-pointer">
                      <p className="text-black/20">20</p>
                      <Heart />
                    </span>
                    <TriangleAlert />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
