import { NextResponse } from "next/server";
import { db } from "src/server/db";
import { comments } from "src/server/db/schema";

interface CreateCommentRequest {
  postId: number;
  text: string;
  userId: string;
  userName: string;
}

export async function GET() {
  try {
    const result = await db.query.comments.findMany();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateCommentRequest;
    const { postId, text, userId, userName } = body;

    if (!postId || !text || !userId || !userName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await db.insert(comments).values({
      postId,
      text,
      userId,
      userName,
    });

    return NextResponse.json(
      { message: "Comment created successfully", result },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
