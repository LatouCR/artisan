import { db } from "src/server/db";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { images } from "src/server/db/schema";

import Create from "./create";

export const dynamic = "force-dynamic"; // force dynamic reload

export default async function Feed() {
    const { userId } = auth();

    let postedImages;
    if (userId) {
        postedImages = await db.query.images.findMany({
            where: eq(images.userId, userId)
        });
    } else {
        postedImages = await db.query.images.findMany();
    }


    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
            <Create />

            <div className="flex flex-row gap-2">
                {postedImages.map((image) => (
                    <div
                        className="bg-white p-4 rounded-md shadow-md"
                        key={image.id}
                    >
                        <div className="w-full flex items-center gap-2">
                            <p>{image.name}</p>
                            <p className="text-slate-400 text-xs">Author id: {image.userId}</p>
                        </div>
                        <div className="w-full h-full items-center justify-center flex">

                            <img src={image.url} alt={image.name} className="w-96 h-auto"/>

                        </div>
                        <div className="w-full flex items-center gap-2 text-slate-400 text-xs">
                            <p>Fecha de Creacion:</p>
                            <p>{new Date(image.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
