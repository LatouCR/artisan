import Link from "next/link";

export default async function HomePage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Link href="/home" className="hover:text-blue-800">
          Home
        </Link>
      </div>
    </main>
  );
}
