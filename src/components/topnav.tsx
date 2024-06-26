import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from "next/link";

export default function TopNav() {
  const { userId } = auth();

  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-white '>
      <div className='flex items-center justify-between w-full'>
        <Link href='/'>
          <div className='text-lg font-bold text-blue-800 uppercase'>
            Artisan
          </div>
        </Link>
        <div className='text-lg flex flex-row items-center justify-center gap-4 pr-4 mx-auto'>
          <Link href='/'>
            <p className='text-black hover:text-blue-400 mr-4'>Home</p>
          </Link>
          <Link href='/posteos'>
            <p className='text-black hover:text-blue-400 mr-4'>Posts</p>
          </Link>
          <Link href='/profile'>
            <p className='text-black hover:text-blue-400 mr-4'>User</p>
          </Link>
        </div>
      </div>
      <div className='flex items-center text-black'>
        {!userId && (
          <>
            <Link
              href='/signin'
              className='text-black hover:text-blue-400 mr-4'
            >
              Sign In
            </Link>
            <Link
              href='/signup'
              className='text-black hover:text-blue-400 mr-4'
            >
              Sign Up
            </Link>
          </>
        )}
        {userId && (
          <Link href='profile' className='text-black mr-4'>
            Profile
          </Link>
        )}
        <div className='ml-auto'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </nav>
  );
}