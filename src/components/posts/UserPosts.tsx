// components/PostComponent.tsx

import { db } from "src/server/db";
import { eq } from "drizzle-orm";
import { posts } from "src/server/db/schema";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageModal from "@/components/modals/ImageModal";
import ActionBar from "@/components/posts/ActionBar";
import UserDisplay from "@/components/UserDisplay";

import { Ellipsis } from "lucide-react";

import { format } from "date-fns";

interface PostComponentProps {
    userId: string;
    userName: string | null;
}

export default async function UserPosts({ userId, userName }: PostComponentProps) {
    const posteos = await db.query.posts.findMany({
        where: eq(posts.userId, userId),
        with: { comments: true },
    });

    if (!posteos) {
        return null;
    }

    return (
        <>
            {posteos.map((posts) => (
                <div key={posts.id}
                    className="max-w-post w-full h-auto overflow-hidden bg-white rounded-sm my-1 border-neutral-400/70 border">
                    <UserDisplay userId={posts.userId} userName={posts.userName}>
                        <div className="flex items-center justify-center text-neutral-300 hover:text-action cursor-pointer">
                            <Ellipsis size={16} />
                        </div>
                    </UserDisplay>

                    <div className="w-full mb-2">
                        <div className="flex items-center px-3 text-justify mb-2">
                            <p className="text-base">{posts.text}</p>
                        </div>
                        {posts.imageUrl && (
                            <AspectRatio ratio={3 / 2} className="bg-muted">
                                <ImageModal imageUrl={posts.imageUrl} altText={"Post Image"} />
                            </AspectRatio>
                        )}
                    </div>

                    <ActionBar 
                    postDate={format(new Date(posts.createdAt), 'PPpp')}
                    postId={posts.id}
                    userId={userId}
                    userName={userName ?? "Unknown"}
                    commentsCount={posts.comments.length} 

                     />
                </div>

            ))}

        </>

    );
}