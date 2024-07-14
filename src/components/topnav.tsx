import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { House, MessageCircleMore, Bell, Search } from 'lucide-react';
import { Input } from './ui/input';
import Link from "next/link";
import Image from 'next/image';

export default function TopNav() {
  const { userId } = auth();

  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-white'>
      <div className='flex items-center justify-between'>
        <Link href='/'>
          <Image
            src="/logo.svg"
            alt='logo'
            width={48}
            height={48}
          />
        </Link>

        <div className="relative h-10 ml-4"> {/* Placeholder */}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-3 py-2 text-md w-full rounded-3xl"
            value=""
          />
        </div>
      </div>

      <div className='text-lg flex flex-row items-center justify-center'>
        <Link href='/' className='text-xs mr-4 flex flex-col items-center justify-center hover:text-blue-400'>
          <House size={36} />
          <p className='text-black hover:text-blue-400'>Home</p>
        </Link>
        <Link href='/posteos' className='text-xs mr-4 flex flex-col items-center justify-center hover:text-blue-400'>
          <MessageCircleMore size={36} />
          <p className='text-black hover:text-blue-400'>Posts</p>
        </Link>
        <Link href='/profile'>
          <p className='text-black hover:text-blue-400 mr-4'>User</p>
        </Link>
      </div>

      <div className='flex items-center justify-center text-black'>
        {!userId && (
          <>
            <Link
              href='/signin'
              className='text-black hover:text-blue-400 mr-4'
            >
              Sign In
            </Link>
          </>
        )}
        {userId && (
          <div className='flex items-center justify-center'>
            <Link href='/profile/settings' className='text-black mr-4'>
              <Bell size={36} fill='black' />
            </Link>
            <UserButton afterSignOutUrl='/' appearance={{
              elements: {
                userButtonAvatarBox: "w-9 h-9"
              }
            }} />
          </div>

        )}

      </div>
    </nav>
  );
}