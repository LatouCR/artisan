"use client"

import { UserButton } from '@clerk/nextjs';

const DotIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
        >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
        </svg>
    )
}

export default function TopNav() {
    return (
        <div className="flex justify-between items-center p-4 bg-white text-black">
            <div>
                <a href="/" className="text-white">
                    Artisan
                </a>
            </div>
            <div>
                <UserButton
                    userProfileMode='navigation'
                    userProfileUrl='/profile'
                >
                </UserButton>
            </div>
        </div>
    );
}