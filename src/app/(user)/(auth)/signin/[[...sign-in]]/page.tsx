import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {

  return (
    <main className="w-screen h-screen flex bg-whitebg flex-row">
      <div className="bg-whitebg w-2/5 h-screen flex flex-col items-center justify-center">
        <h1 className=" w-full px-6 text-2xl font-semibold">ARTISAN</h1>
        <SignIn
          forceRedirectUrl={'/'}
          signUpUrl={'/signup'}
        />

        <footer className="w-full justify-center items-center flex flex-col gap-4">
          <span>
            <ul className="flex w-full gap-2">
              <li><a href="">About</a></li>
              <li><a href="">Terms</a></li>
              <li><a href="">Cookies</a></li>
              <li><a href="">Privacy</a></li>
              <li><a href="">Help</a></li>
              <li><a href="">More</a></li>
            </ul>
          </span>
          <span className="flex w-full justify-center items-center gap-2">
            <img src="ar" alt="Artisan C logo" />
            <p>ARTISAN G04 © 2024</p>
          </span>
        </footer>

      </div>

      <div className="bg-white max-w-1/2 w-3/5 h-screen overflow-hidden">
        <Image
          src="/loginimage.jpg"
          alt="login picture"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />

      </div>
    </main>
  );
}
