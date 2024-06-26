import { db } from "src/server/db";
import { eq } from "drizzle-orm";
import CreatePost from "./create";
import { auth } from "@clerk/nextjs/server";
import { posts } from "src/server/db/schema";
export const dynamic = "force-dynamic"; // force dynamic reload

export default async function Feed() {
    const { userId } = auth();
    console.log(posts);
    console.log(userId);

    let posteos;
    if (userId) {
        posteos = await db.query.posts.findMany({
            where: eq(posts.userId, userId)
        });
    } else {
        posteos = await db.query.posts.findMany();
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
            <div className="">
                <h1>Prueba de conexion con base de datos</h1>
                <h1 className="text-red-600 text-base font-semibold">Para Crear un post, iniciar sesion!</h1>
                <div className="flex gap-2">
                    <CreatePost/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    {posteos.map((post) => (
                        <div
                            className="bg-white p-4 rounded-md shadow-md "
                            key={post.id}
                        >
                            <div className="w-full flex items-center gap-2">
                                <p>{post.userName}</p>
                                <p className="text-slate-400 text-xs">Author id: {post.userId}</p>
                            </div>
                            <p className="text-blue-400">{post.text}</p>
                            <div className="w-full flex items-center gap-2 text-slate-400 text-xs">
                                <p>Fecha de Creacion:</p>
                                <p>{new Date(post.createdAt).toLocaleString()}</p>
                            </div>
                        </div>))
                    }
                </div>
            </div>
        </main>
    );
}
