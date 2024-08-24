/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from "next/server";
import { db } from "src/server/db";
import { and, eq, or } from "drizzle-orm";
import { friendRequests, friendships } from "src/server/db/schema";
import { z } from "zod";

const sendFriendRequestSchema = z.object({
  receiverId: z.string(),
  senderId: z.string(),
  userName: z.string()
});

const respondToFriendRequestSchema = z.object({
  requestId: z.number(),
  userId: z.string(),
  action: z.enum(['accept', 'reject']),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { receiverId, senderId, userName } = sendFriendRequestSchema.parse(body);

    if (!senderId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existingRequest = await db.select().from(friendRequests)
      .where(
        or(
          and(
            eq(friendRequests.senderId, senderId),
            eq(friendRequests.receiverId, receiverId)
          ),
          and(
            eq(friendRequests.senderId, receiverId),
            eq(friendRequests.receiverId, senderId)
          )
        )
      ).execute();

    if (existingRequest.length > 0) {
      return NextResponse.json({ error: "Friend request already exists" }, { status: 400 });
    }

    const result = await db.insert(friendRequests).values({
      senderId,
      receiverId,
      status: 'pending',
      userName,
    }).execute();

    return NextResponse.json({ message: "Friend request sent", result }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request body", details: error.errors }, { status: 400 });
    }
    console.error("Error sending friend request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { requestId, action, userId } = respondToFriendRequestSchema.parse(body);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const friendRequest = await db.select().from(friendRequests)
      .where(eq(friendRequests.id, requestId))
      .execute();

    if (friendRequest.length === 0) {
      return NextResponse.json({ error: "Friend request not found" }, { status: 404 });
    }

    if (friendRequest[0]?.receiverId !== userId) {
      return NextResponse.json({ error: "Not authorized to respond to this request" }, { status: 403 });
    }

    if (action === 'accept') {
      await db.insert(friendships).values({
        userId1: friendRequest[0].senderId,
        userId2: friendRequest[0].receiverId
      }).execute();

      await db.update(friendRequests)
        .set({ status: 'accepted' })
        .where(eq(friendRequests.id, requestId))
        .execute();

      return NextResponse.json({ message: "Friend request accepted" }, { status: 200 });
    } else if (action === 'reject') {
      await db.update(friendRequests)
        .set({ status: 'rejected' })
        .where(eq(friendRequests.id, requestId))
        .execute();

      return NextResponse.json({ message: "Friend request rejected" }, { status: 200 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request body", details: error.errors }, { status: 400 });
    }
    console.error("Error responding to friend request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const friends = await db.select().from(friendships)
      .where(
        or(
          eq(friendships.userId1, userId),
          eq(friendships.userId2, userId)
        )
      ).execute();

    return NextResponse.json(friends, { status: 200 });
  } catch (error) {
    console.error("Error getting friends:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}