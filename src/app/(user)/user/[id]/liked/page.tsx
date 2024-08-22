/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @next/next/no-img-element */
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { MapPin, UserRoundPlus, Pencil, Globe } from "lucide-react";
import Link from "next/link";
import ProfileActions from "@/components/ProfileActions";

import { db } from "src/server/db";
import { eq, not, and } from "drizzle-orm";
import { posts } from "src/server/db/schema";
import { likes } from "src/server/db/schema";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageModal from "@/components/modals/ImageModal";
import ActionBar from "@/components/posts/ActionBar";
import UserDisplay from "@/components/UserDisplay";

import { Ellipsis } from "lucide-react";

import { format } from "date-fns";

export default async function UserPage({ params }: { params: { id: string } }) {
    const { id } = params;

    // Get the current user from the session and check their id
    const CurrentUser = await currentUser();
    const currentId = CurrentUser?.id;
    console.log("This is the current user id: " + currentId);


    // Get the user from the Clerk API using the user ID
    const user = await clerkClient.users.getUser(id);
    console.log("This is the profile user id: " + user.id);

    if (!user) return null;
    if (!currentId) return null;

    const likedPosts = await db.query.likes.findMany({
        with: { post: true },
        where: and(
            eq(likes.userId, id),
        )
    });

    console.log("User has liked posts:");
    console.table(likedPosts);


    // Revalidate the path so that the page is updated with the latest data
    revalidatePath(`/user/${id}`);


    console.log(user);

    const defaultHeaderUrl = "https://placehold.co/600x400";

    console.log("This is the user metadata: " + JSON.stringify(user?.unsafeMetadata));

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
            <div className="flex items-center justify-center w-full flex-col">
                <div className="max-w-post w-full h-auto overflow-hidden bg-white rounded-lg my-2 border-[#BDBDBD] border">
                    <span className="w-full h-full max-h-[240px] rounded-t-lg">
                        <img
                            src={(user?.unsafeMetadata as { HeaderURL?: string })?.HeaderURL ?? defaultHeaderUrl}
                            alt="User Header or Profile Picture"
                            className="w-full h-full max-h-[240px] object-cover rounded-t-lg"
                        />
                    </span>

                    <div className="mx-4 flex flex-col gap-2">

                        <div className="flex w-full">
                            <img
                                src={user.imageUrl}
                                alt="User Profile Picture"
                                className="w-32 h-32 rounded-full border-2 border-white -mt-16"
                            />
                            <div className="w-full flex justify-end mt-4">
                                {user.id == currentId ? (
                                    <Link
                                        href={`/user/${id}/edit`}
                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-black/40 text-black hover:text-atprimary hover:border-atprimary"
                                    >
                                        <Pencil size={18} />
                                    </Link>
                                ) : (
                                    <Link
                                        href="/"
                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-black/40 text-black hover:text-atprimary hover:border-atprimary"
                                    >
                                        <UserRoundPlus size={18} />
                                    </Link>
                                )}

                            </div>
                        </div>

                        <div id="userInfo">
                            <h2 className="text-lg font-semibold">{user.username ?? user.fullName}</h2>
                            {(user?.unsafeMetadata as { jobPosition?: string })?.jobPosition && (
                                <p className="text-sm font-extralight text-slate-400">{(user?.unsafeMetadata as { jobPosition?: string })?.jobPosition}</p>
                            )}

                        </div>
                        {(user?.unsafeMetadata as { Biography?: string })?.Biography && (
                            <div className="w-full text-justify pt-1 pb-3">
                                <p className="w-full text-sm font-extralight">{(user?.unsafeMetadata as { Biography?: string })?.Biography}</p>
                            </div>
                        )}
                    </div>

                    <div className="mx-4 flex items-center gap-4 pb-3">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} color="#023E8A" />
                            <p className="text-sm font-medium text-atprimary">{(user?.unsafeMetadata as { Ubication?: string })?.Ubication}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe size={16} color="#023E8A" />
                            <p className="text-sm font-medium text-atprimary">{(user?.unsafeMetadata as { githubUrl?: string })?.githubUrl}</p>
                        </div>
                    </div>

                    <div className="mx-4 flex gap-3 pb-3"> {/* Componetizar -- Followers & Friends*/}
                        <Link href={`/user/${id}/friends`}>
                            <span className="flex gap-1"><p className="text-atprimary font-semibold">18</p> <p className="font-light">Friends</p></span>
                        </Link>
                        <Link href={`/user/${id}/followers`}>
                            <span className="flex gap-1"><p className="text-atprimary font-semibold">100 mil</p> <p className="font-light">Followers</p></span>
                        </Link>
                    </div>

                    <ProfileActions id={id} />

                </div>
                {likedPosts.map((likedpost) => (
                    <div key={likedpost.id}
                        className="max-w-post w-full h-auto overflow-hidden bg-white rounded-sm my-1 border-neutral-400/70 border">
                        <UserDisplay userId={likedpost.post?.userId} userName={likedpost.post?.userName}>
                            <div className="flex items-center justify-center text-neutral-300 hover:text-action cursor-pointer">
                                <Ellipsis size={16} />
                            </div>
                        </UserDisplay>

                        <div className="w-full mb-2">
                            <div className="flex items-center px-3 text-justify mb-2">
                                <p className="text-base">{likedpost.post?.text}</p>
                            </div>
                            {posts.imageUrl && (
                                <AspectRatio ratio={3 / 2} className="bg-muted">
                                    <ImageModal imageUrl={likedpost.post?.imageUrl} altText={"Post Image"} />
                                </AspectRatio>
                            )}
                        </div>

                        <ActionBar
                            postId={likedpost.post?.id}
                            userId={user.id}
                            userName={likedpost.post?.userName ?? "Unknown"}
                        />
                    </div>

                ))}
            </div>
        </main>
    );
}