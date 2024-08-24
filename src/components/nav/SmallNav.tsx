"use client"
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Flame, CirclePlus, Settings, HelpCircle, LogOut, Bookmark, UsersRound, Newspaper } from 'lucide-react';
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const SmallNav = ({ currentUser }: { currentUser?: string }) => {

    const pathname = usePathname();
    const isActive = (href: string) => {
        return pathname == href;
    }

    return (
        <aside id="left-sidebar" className="flex-1 flex flex-col fixed left-0 h-[calc(100%-73px)] w-16 z-20 bg-white content-between border-r border-neutral-400/70 items-center">
                <nav className="flex flex-col border-b border-neutral-400/70">
                    <ul className="py-2 text-attext w-full flex flex-col gap-1">
                        <li className={isActive(`/home`) ? 'w-full p-2 flex items-center bg-athover rounded-xl text-atprimary' : 'w-full p-2 flex items-center hover:bg-athover rounded-xl'}>
                            <Link href={`/home`} className="gap-2 inline-flex items-center" >
                                {isActive(`/home`) ?
                                    <Image src="/homefilled.svg" alt="home" height={32} width={30} /> :
                                    <Image src="/home.svg" alt="home" height={32} width={30} />}
                            </Link>
                        </li>
                        <li className={isActive(`/popular`) ? 'w-full p-2 flex items-center bg-athover rounded-xl text-atprimary' : 'w-full p-2 flex items-center hover:bg-athover rounded-xl'}>
                            <Link href={`/popular`} className="gap-2 inline-flex items-center">
                                {isActive(`/popular`) ? <Flame size={32} fill="#023E8A" /> : <Flame size={32} />}
                            </Link>
                        </li>

                        <li className="w-full p-2 flex items-center hover:bg-atprimary/10 rounded-xl">
                            <Link href={`profile/saved`} className="gap-2 inline-flex items-center">
                                {isActive(`profile/saved`) ? <Bookmark size={32} fill="#023E8A" /> : <Bookmark size={32} />}
                            </Link>
                        </li>
                        <li className={isActive(`/messages`) ? 'w-full p-2 flex items-center bg-athover rounded-xl text-atprimary' : 'w-full p-2 flex items-center hover:bg-athover rounded-xl'}>
                            <Link href={`/messages`} className="gap-2 inline-flex items-center">
                                {isActive(`/messages`) ?
                                    <Image src="/chatfilled.svg" alt="home" height={32} width={32} /> :
                                    <Image src="/chat.svg" alt="home" height={32} width={32} />}
                            </Link>
                        </li>
                    </ul>
                </nav>

                <nav className="flex flex-col border-b mt-3 border-neutral-400/70">
                    <ul className="py-2 text-attext w-full flex flex-col gap-1">
                        <li className={isActive(`/user/${currentUser}`) ? 'w-full p-2 flex items-center bg-athover rounded-xl text-atprimary' : 'w-full p-2 flex items-center hover:bg-athover rounded-xl'}>
                            <Link href={`/user/${currentUser}`} className="gap-2 inline-flex items-center" >
                                {isActive(`/user/${currentUser}`) ? <UsersRound size={32} fill="#023E8A" /> : <UsersRound size={32} />}
                            </Link>
                        </li>
                        <li className={isActive(`/articles`) ? 'w-full p-2 flex items-center bg-athover rounded-xl text-atprimary' : 'w-full p-2 flex items-center hover:bg-athover rounded-xl'}>
                            <Link href={`/articles`} className="gap-2 inline-flex items-center">
                            {isActive(`articles`) ? <Newspaper size={32} fill="#023E8A" /> : <Newspaper size={32} />}
                            </Link>
                        </li>
                        <li className="w-full p-2 flex items-center hover:bg-atprimary/10 rounded-xl">
                            <Button className="gap-2 inline-flex items-center justify-start w-full h-8 p-0 hover:no-underline" variant="link"> {/* onClick = openPostModal */}
                                <CirclePlus size={32} />
                            </Button>
                        </li>
                    </ul>
                </nav>

                <nav className="flex flex-col border-b mt border-neutral-400/70">
                    <ul className="py-2 text-attext w-full flex flex-col gap-1">
                        <li className={isActive(`/settings`) ? 'w-full p-2 flex items-center bg-athover rounded-xl text-atprimary' : 'w-full p-2 flex items-center hover:bg-athover rounded-xl'}>
                            <Link href={`/settings`} className="gap-2 inline-flex items-center">
                                {isActive(`/settings`) ? <Settings size={32} color="#023E8A" /> : <Settings size={32} />}
                            </Link>
                        </li>
                        <li className={isActive(`/help`) ? 'w-full p-2 flex items-center bg-athover rounded-xl text-atprimary' : 'w-full p-2 flex items-center hover:bg-athover rounded-xl'}>
                            <Link href={`/help`} className="gap-2 inline-flex items-center">
                                {isActive(`/help`) ? <HelpCircle size={32} color="#023E8A" /> : <HelpCircle size={32} />}
                            </Link>
                        </li>
                        <li className="w-full p-2 flex items-center hover:bg-athover rounded-xl">
                            <SignOutButton
                                redirectUrl="/"
                            >
                                <div className="gap-2 inline-flex items-center hover:cursor-pointer">
                                    <LogOut />
                                </div>
                            </SignOutButton>

                        </li>
                    </ul>
                </nav>

        </aside>
    );
};

export default SmallNav;

