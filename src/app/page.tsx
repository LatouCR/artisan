import { db } from "../server/db";

export const dynamic = "force-dynamic"; // force dynamic reload

export default async function HomePage() {

  const posts = await db.query.posts.findMany();
  console.log(posts)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1>trabajo en proceso....</h1>

        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>))
        }
      </div>
    </main>
  );
}
