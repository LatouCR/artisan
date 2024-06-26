import { db } from "src/server/db";
import DeletePost from "./delete";
import CreatePost from "./create";

export const dynamic = "force-dynamic"; // force dynamic reload

export default async function Feed() {

    const posts = await db.query.posts.findMany();
    console.log(posts)

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1>Prueba de conexion con base de datos</h1>
                <div className="flex gap-2">
                    <CreatePost/>
                    <DeletePost/>
                </div>
                <div className="flex flex-col gap-2">
                    {posts.map((post) => (
                        <div
                            className="bg-white p-4 rounded-md shadow-md w-96 "
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
