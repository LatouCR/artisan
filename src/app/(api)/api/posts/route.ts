import { NextResponse } from 'next/server';
import { db } from "src/server/db";
import { posts } from "src/server/db/schema";

// Define the type for the request body
interface CreatePostRequest {
  text: string;
  userId: string;
  userName: string;
}

// Define the type for a post based on your schema
export async function POST(request: Request) {
  try {
    const body = await request.json() as CreatePostRequest;
    const { text, userId, userName } = body;

    // Validate input
    if (!text || !userId || !userName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert the post using Drizzle ORM
    const result = await db.insert(posts).values({
      text,
      userId,
      userName,
    })
    return NextResponse.json({ message: 'Post created successfully', result}, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}