import { db } from "src/server/db";
import { eq } from "drizzle-orm";
import CreatePost from "./create";
import { auth } from "@clerk/nextjs/server";
import { posts, comments } from "src/server/db/schema";

import { Plus, Heart, MessageCircleMore, Bookmark, Reply, TriangleAlert } from "lucide-react";

export const dynamic = "force-dynamic"; // force dynamic reload

export default async function Feed() {
    const { userId } = auth();
    console.log(posts);
    console.log(userId);

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

                <div className="my-2">
                    <CreatePost />
                </div>

                {posteos.map((post) => (
                    <div
                        key={post.id}
                        className="max-w-post w-full h-auto overflow-hidden bg-white rounded-sm my-2 border-slate-300 border">
                        <div className="flex items-center px-3 py-2">
                            <div className="flex items-center w-full justify-between">
                                <div className="flex gap-2">
                                    <div className="w-12 h-12 bg-black flex items-center justify-center rounded-full cursor-pointer">
                                        <p className="text-white">US</p>
                                    </div>
                                    <div>
                                        <h2 className=" font-semibold">{post.userName}</h2>
                                        <p className=" text-sm text-slate-400">Job Position</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center text-cyan-800 hover:text-cyan-600 cursor-pointer">
                                    <Plus size={12} />
                                    <p className=" font-semibold">Follow</p>
                                </div>
                            </div>

                        </div>

                        <div className="w-full mb-2">
                            <div className="flex items-center px-3 text-justify mb-2">
                                <p className="text-base">
                                    {post.text}
                                </p>
                            </div>
                            <div>
                                <img
                                    src="https://images.unsplash.com/photo-1720772821301-20a71d4ca69d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="post"
                                    className="w-full h-96 object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex items-center px-4">
                            <div className="w-full border-t border-black/40">
                                <div className="my-2 flex items-center justify-between">
                                    <div className="text-slate-400 text-xs">
                                        <p>{new Date(post.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="flex gap-2 text-black/40 hover:text-teal-700 cursor-pointer">
                                            <p className="CommentNumer text-black/20">20</p>
                                            <MessageCircleMore />
                                        </span>
                                        <span className="flex gap-2 text-black/40 hover:text-teal-700 cursor-pointer">
                                            <p className="text-black/20">20</p>
                                            <Heart />
                                        </span>
                                        <span className="flex gap-2 text-black/40 hover:text-teal-700 cursor-pointer">
                                            <Bookmark />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 pb-2 flex justify-between text-black/40">
                            <div className="flex gap-4 hover:cursor-pointer">
                                <p className="font-semibold">view replies</p>
                            </div>
                        </div>

                        {post.comments.map((comment) => (
                            <div className="flex flex-col w-full my-2" key={comment.id}>
                                <div className="flex w-full px-2 gap-2">
                                    <div className="w-12 h-12 bg-black flex items-center justify-center rounded-full">
                                        <p className="text-white">US</p>
                                    </div>
                                    <div className="">
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
