/* eslint-disable @next/next/no-img-element */
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import PostComponent from "@/components/posts/Posts";
import Link from "next/link";

export default async function UserPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const user = await clerkClient.users.getUser(id);
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
                        <img
                            src={user.imageUrl}
                            alt="User Profile Picture"
                            className="w-32 h-32 rounded-full border-2 border-white -mt-16"
                        />
                        <div className="">
                            <h2 className="text-lg font-semibold">{user.username ?? user.fullName}</h2>
                            <p className="text-sm font-extralight text-slate-400">Jr Engineer I at LTV | Computer Engineering Student - ULACIT</p>
                        </div>
                        <div className="w-full text-justify pt-1 pb-3">
                            <p className="w-full text-sm font-extralight">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent scelerisque arcu non consequat molestie. Donec ac lobortis mi. Aliquam lobortis volutpat mi, eu sollicitudin dui congue quis. Phasellus aliquet neque non tempus maximus. Fusce quis nisi porttitor, tincidunt quam eu, </p>
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
                    <div className="mx-2 flex justify-between text-lg font-semibold text-atprimary">
                        <p className="w-20 flex justify-center">
                            Posts
                        </p>
                        <p className="w-24 flex justify-center">
                            Comments
                        </p>
                        <p className="w-20 flex justify-center">
                            Pictures
                        </p>
                    </div>
                </div>
                <PostComponent userId={id}/>
            </div>
        </main>
    );
}