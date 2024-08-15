import { NextResponse } from "next/server";
import { db } from "src/server/db";
import { eq, and } from "drizzle-orm";
import { likes } from "src/server/db/schema";

export async function POST(request: Request) {
    try {
        const { postId, userId } = await request.json();

        if (!postId || !userId) {
            return NextResponse.json({ error: "Missing postId or userId" }, { status: 400 });
        }

        const result = await db.insert(likes).values({
            postId,
            userId,
        });


        return NextResponse.json({ message: "Like added", result }, { status: 201 });
    } catch (error) {
        console.error("Error adding like:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}



// Leer "likes" para una publicación específica
export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const postId = searchParams.get("postId");
  
      if (!postId) {
        return NextResponse.json({ error: "Missing postId" }, { status: 400 });
      }
  
      const result = await db.query.likes.findMany({
        where: eq(likes.postId, Number(postId)),
      });
  
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
  
  

  export async function DELETE(request: Request) {
    try {
        const { postId, userId } = await request.json();

        if (!postId || !userId) {
            return NextResponse.json({ error: "Missing postId or userId" }, { status: 400 });
        }

        const result = await db
            .delete(likes)
            .where(and(eq(likes.postId, postId), eq(likes.userId, userId)));

        return NextResponse.json({ message: "Like removed", result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

