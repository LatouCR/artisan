import { NextResponse } from "next/server";
import { eq, or, ilike, and } from 'drizzle-orm';
import { db } from "src/server/db";
import { posts } from "src/server/db/schema";

interface SearchRequest {
  query: string;
  isHashtag?: boolean;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SearchRequest;
    const { query, isHashtag } = body;

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    let searchResults;

    if (isHashtag) {
      // Búsqueda por hashtag
      searchResults = await db.select()
        .from(posts)
        .where(
          and(
            ilike(posts.text, `%#${query}%`),
            or(
              eq(posts.text, `#${query}`),
              ilike(posts.text, `% #${query} %`),
              ilike(posts.text, `% #${query}\n%`),
              ilike(posts.text, `% #${query}$`)
            )
          )
        )
        .limit(20);
    } else {
      // Búsqueda general por palabras clave
      searchResults = await db.select()
        .from(posts)
        .where(
          or(
            ilike(posts.text, `%${query}%`),
            ilike(posts.userName, `%${query}%`)
          )
        )
        .limit(20);
    }

    return NextResponse.json(searchResults, { status: 200 });
  } catch (error) {
    console.error("Error performing search:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');
  const isHashtag = url.searchParams.get('hashtag') === 'true';

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    let searchResults;

    if (isHashtag) {
      // Búsqueda por hashtag
      searchResults = await db.select()
        .from(posts)
        .where(
          and(
            ilike(posts.text, `%#${query}%`),
            or(
              eq(posts.text, `#${query}`),
              ilike(posts.text, `% #${query} %`),
              ilike(posts.text, `% #${query}\n%`),
              ilike(posts.text, `% #${query}$`)
            )
          )
        )
        .limit(20);
    } else {
      // Búsqueda general por palabras clave
      searchResults = await db.select()
        .from(posts)
        .where(
          or(
            ilike(posts.text, `%${query}%`),
            ilike(posts.userName, `%${query}%`)
          )
        )
        .limit(20);
    }

    return NextResponse.json(searchResults);
  } catch (error) {
    console.error("Error performing search:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}