import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {

  return (
    <main className="w-screen h-screen flex bg-whitebg flex-row">
      <div className="bg-whitebg w-1/2 h-screen flex items-center justify-center">
        <SignIn
          forceRedirectUrl={'/'}
          signUpUrl={'/signup'}
        />
      </div>

      <div className="bg-white w-1/2 h-screen">

      </div>
    </main>
  );
}
