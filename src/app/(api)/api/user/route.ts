import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

interface UpdateUserMetadataRequest {
  userId: string;
  JobPosition?: string;
  Biography?: string;
  HeaderURL?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UpdateUserMetadataRequest;
    const { userId, JobPosition, Biography, HeaderURL  } = body;
    await clerkClient.users.updateUserMetadata(userId, {
      unsafeMetadata: {
        JobPosition,
        Biography,
        HeaderURL,
      },
    });
    return NextResponse.json(
      { message: "User metadata updated successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error updating user metadata:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: "userId is required" },
      { status: 400 }
    );
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user metadata:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}