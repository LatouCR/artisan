import { clerkClient } from "@clerk/nextjs/server";
const clerkSecretKey = process.env.CLERK_SECRET_KEY;

export async function getUserImage(userId: string) {
    if (!process.env.CLERK_SECRET_KEY) {
      throw new Error("CLERK_SECRET_KEY is missing");
    }
    const user = await clerkClient.users.getUser(userId);
    return user.imageUrl;
  }