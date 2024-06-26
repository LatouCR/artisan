import { SignUp } from "@clerk/nextjs";

export default function SingUpPage() {

    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1>Sing Up Page</h1>

          <div>
            <SignUp 
              forceRedirectUrl={'/'}
              signInUrl={'/signin'}
            />
          </div>

        </div>
      </main>
    );
  }
  