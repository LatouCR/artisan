/* eslint-disable @next/next/no-img-element */
import { clerkClient } from "@clerk/nextjs/server";
import { cn } from "src/lib/utils";

interface UserInfoProps {
    userId?: string | null,
    className?: string,
}

export default async function UserImg({ userId, className }: UserInfoProps) {

    if (!userId) {
        return null;
    }

    const response = await clerkClient.users.getUser(userId);


    return (
        <div className={cn("max-w-16 max-h-16 border-slate-400 border flex items-center justify-center rounded-full cursor-pointer", className)}>
            <img src={response.imageUrl} alt="" className="rounded-full" />
        </div>
    )
}