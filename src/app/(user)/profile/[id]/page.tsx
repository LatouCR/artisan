/* eslint-disable @next/next/no-img-element */
import { clerkClient } from "@clerk/nextjs/server";

interface UserMetadata {
    biography?: string;
    headerUrl?: string;
}

export default async function HomePage({ params }: { params: { id: string } }) {
    const { id } = params;
    const user = await clerkClient.users.getUser(id);

    let metadata: UserMetadata = {};
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user?userId=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        metadata = await response.json() as UserMetadata;
    } catch (error) {
        console.error("Error fetching user metadata:", error);
    }

    const defaultHeaderUrl = "https://images2.alphacoders.com/872/872294.png";

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-3xl font-bold">Perfil de Usuario</h1>
                <div className="flex flex-col items-center gap-4">
                    <img
                        src={metadata.headerUrl ?? defaultHeaderUrl}
                        alt="User Header or Profile Picture"
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <img
                        src={user.imageUrl}
                        alt="User Profile Picture"
                        className="w-24 h-24 rounded-full border-4 border-white -mt-12"
                    />
                    <h2 className="text-2xl font-semibold">{user.fullName}</h2>
                    <p className="text-center max-w-md">
                        <span className="font-semibold">Biography: </span>
                        {metadata.biography}
                    </p>
                </div>
            </div>
        </main>
    );
}