import Link from "next/link";
import Image from 'next/image';

import { Bell } from "lucide-react";

import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

import Seachbar from "../Seachbar";

export default function TopNav() {
  const { userId } = auth();

  return (
    <header className='flex items-center justify-between px-5 py-4 bg-white border-b border-neutral-400/70'>
      <div className='flex items-center justify-between'>
        <Link href='/'>
          <Image
            src="/logo.svg"
            alt='logo'
            width={48}
            height={48}
          />
        </Link>
        <Seachbar />
      </div>
      <div className='flex items-center justify-center text-black'>
        {!userId && (
          <nav className="flex gap-2 mr-4">
            <Link
              href='/signin'
              className='relative flex justify-center items-center p-1.5 border border-black rounded-xl w-24 h-9 font-semibold text-black hover:text-white overflow-hidden group'
            >
              <span className="relative z-10">Sign In</span>
              <span className="absolute inset-0 bg-atprimary transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
            </Link>
            <Link
              href='/signup'
              className='relative flex justify-center items-center p-1.5 rounded-xl w-24 h-9 overflow-hidden group'
            >
              <span className="relative z-10 font-semibold text-white">Sign Up</span>
              <span className="absolute inset-0 bg-ataccent"></span>
              <span className="absolute inset-0 bg-[#6e567f2a] transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
            </Link>
          </nav>
        )}
        {userId && (
          <div className='flex items-center justify-center'>
            <Link href='/profile/settings' className='text-black mr-4'>
              <Bell size={36} fill='black' />
            </Link>
            <UserButton afterSignOutUrl='/' userProfileMode="navigation" userProfileUrl="/profile" appearance={{
              elements: {
                userButtonAvatarBox: "w-9 h-9"
              }
            }} />
          </div>

        )}
      </div>
    </header>
  );
}