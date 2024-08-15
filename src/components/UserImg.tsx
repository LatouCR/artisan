import { use } from 'react';
import { clerkClient } from "@clerk/nextjs/server";
import { cn } from "src/lib/utils";

interface UserImgProps {
  userId: string;
  className?: string;
}

async function getUserImage(userId: string) {
  const user = await clerkClient.users.getUser(userId);
  return user.imageUrl;
}

export default function UserImg({ userId, className }: UserImgProps) {
  const imageUrl = use(getUserImage(userId));

  return (
    <div className={cn("max-w-16 max-h-16 border-slate-400 border flex items-center justify-center rounded-full cursor-pointer", className)}>
      <img src={imageUrl} alt="" className="rounded-full" />
    </div>
  );
}