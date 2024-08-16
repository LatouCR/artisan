import { NextResponse } from "next/server";
import { db } from "src/server/db";
import { eq, and } from "drizzle-orm";
import { likes } from "src/server/db/schema";

interface LikeRequestBody {
  postId?: number; 
  commentId?: number; 
  userId: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as LikeRequestBody;
    const { postId, commentId, userId } = body;
    
    if ((!postId && !commentId) || !userId) {
      return NextResponse.json({ error: "Missing postId, commentId, or userId" }, { status: 400 });
    }
    
    const result = await db.insert(likes).values({
      postId: postId ?? null,
      commentId: commentId ?? null,
      userId,
    });
    return NextResponse.json({ message: "Like added", result }, { status: 201 });
  } catch (error) {
    console.error("Error adding like:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const commentId = searchParams.get("commentId");

    if (!postId && !commentId) {
      return NextResponse.json({ error: "Missing postId or commentId" }, { status: 400 });
    }

    let result;
    if (postId) {
      result = await db.query.likes.findMany({
        where: eq(likes.postId, Number(postId)),
      });
    } else if (commentId) {
      result = await db.query.likes.findMany({
        where: eq(likes.commentId, Number(commentId)),
      });
    }
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error getting likes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json() as LikeRequestBody;
    const { postId, commentId, userId } = body;
    
    if ((!postId && !commentId) || !userId) {
      return NextResponse.json({ error: "Missing postId, commentId, or userId" }, { status: 400 });
    }

    let result;
    if (postId) {
      result = await db
        .delete(likes)
        .where(and(eq(likes.postId, postId), eq(likes.userId, userId)));
    } else if (commentId) {
      result = await db
        .delete(likes)
        .where(and(eq(likes.commentId, commentId), eq(likes.userId, userId)));
    }
    
    return NextResponse.json({ message: "Like removed", result }, { status: 200 });
  } catch (error) {
    console.error("Error removing like:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
