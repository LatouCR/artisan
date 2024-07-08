import { db } from "src/server/db";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { images } from "src/server/db/schema";

import ImageModal from "@/components/ImageModal";

import Create from "./create";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
            <div className="flex min-w-64 min-h-64 gap-2">
                {postedImages.map((image) => (
                    <div
                        className=""
                        key={image.id}
                    >
                        <div className="w-full flex flex-col items-center">
                            <p>{image.name}</p>
                            <p className="text-slate-400 text-xs">Author id: {image.userId}</p>
                        </div>
                        <div className="max-w-64 max-h-60">
                            <AspectRatio ratio={3 / 2} className="bg-muted">
                                <ImageModal imageUrl={image.url} altText={image.name} />
                            </AspectRatio>
                        </div>
                        <div className="w-full flex items-center gap-2 text-slate-400 text-xs">
                            <p>Fecha de Creacion:</p>
                            <p>{new Date(image.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Create />
        </main>
    );
}
