import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs';

export default function TopNav() {
    return (
        <div className="flex justify-between items-center p-4 bg-white text-black">
            <div>
                <a href="/" className="text-white">
                    Artisan
                </a>
            </div>
            <div>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </div>
        </div>
    );
}