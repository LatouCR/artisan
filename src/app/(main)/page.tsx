import { NewForm } from "./NewForm";

export default async function HomePage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1>trabajo en proceso....</h1>
        <NewForm/>
      </div>
    </main>
  );
}
