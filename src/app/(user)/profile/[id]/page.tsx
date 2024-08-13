/* eslint-disable @next/next/no-img-element */
import { clerkClient } from "@clerk/nextjs/server";

export default async function HomePage({ params }: { params: { id: string } }) {

    const { id } = params;
    const response = await clerkClient.users.getUser(id);
    console.log(response)

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1>Perfil de Usuario</h1>
                <div className="flex flex-col">
                    <p>{response.fullName}</p>
                    <img src={response.imageUrl} alt="User Profile Picture" />
                    <p>Bio</p>
                    <p>Ubicacion</p>
                    <p>Job Position</p>
                    <p>Header</p>
                </div>
            </div>
        </main>
    );
}
