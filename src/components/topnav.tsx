import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from "next/link";

export default function TopNav() {
const { userId } = auth();

    return (
        <nav className='flex items-center justify-between px-6 py-4 bg-white'>
        <div className='flex items-center'>
          <Link href='/'>
            <div className='text-lg font-bold text-white uppercase'>
              Artisan
            </div>
          </Link>
        </div>
        <div className='flex items-center text-white'>
          {!userId && (
            <>
              <Link
                href='/signin'
                className='text-gray-300 hover:text-white mr-4'
              >
                Sign In
              </Link>
              <Link
                href='/signup'
                className='text-gray-300 hover:text-white mr-4'
              >
                Sign Up
              </Link>
            </>
          )}
          {userId && (
            <Link href='profile' className='text-gray-300 hover:text-white mr-4'>
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