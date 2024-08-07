import Link from "next/link";
import Image from "next/image";
import { Flame, CirclePlus, PencilRuler, HelpCircle } from 'lucide-react';

const SideNav = () => {

    return (
        <aside id="left-sidebar" className="flex-1 flex flex-col fixed left-0 h-[calc(100%-73px)] sm:w-20 xs:w-20  lg:w-60 z-20 bg-white content-between border-r border-neutral-400/70">
            <nav className="flex flex-col flex-1">
                <ul className="py-4 text-attext w-full">
                    <li className="w-full p-2 hover:bg-atprimary flex items-center ">
                        <Link href="/home" className="gap-2 inline-flex items-center">
                            <Image
                                src="/home.svg"
                                alt="home"
                                height={32}
                                width={30}
                            />
                            <h1 className="font-semibold text-lg sm:invisible lg:visible">
                                Home
                            </h1>
                        </Link>
                    </li>
                    <li className="w-full p-2 hover:bg-atprimary flex items-center">
                        <Link href="/popular" className="gap-2 inline-flex items-center">
                            <Flame size={32} />
                            <h1 className="font-semibold text-lg sm:invisible lg:visible">
                                Trending
                            </h1>
                        </Link>
                    </li>
                    <li className="w-full p-2 hover:bg-atprimary flex items-center">
                        <Link href="/calendario" className="gap-2 inline-flex items-center">
                            <Image
                                src="/chat.svg"
                                alt="chat"
                                height={32}
                                width={32}
                            />
                            <h1 className="font-semibold text-lg sm:invisible lg:visible">
                                Chat
                            </h1>
                        </Link>
                    </li>
                    <li className="w-full p-2 hover:bg-atprimary flex items-center">
                        <Link href="/mensajes" className="gap-2 inline-flex items-center">
                            <CirclePlus size={32} />
                            <h1 className="font-semibold text-lg sm:invisible lg:visible">
                                New
                            </h1>
                        </Link>
                    </li>
                </ul>
            </nav>

            <li className="w-full p-2 hover:bg-atprimary flex items-center">
                <Link href="/herramientas" className="gap-2 inline-flex items-center">
                    <PencilRuler size={28} />
                    <h1 className="font-semibold text-lg sm:invisible lg:visible">
                        Tools
                    </h1>
                </Link>
            </li>
            <li className="w-full p-2 hover:bg-atprimary flex items-center">
                <Link href="/help" className="gap-2 flex items-center">
                    <HelpCircle size={28} />
                    <h1 className="font-semibold text-lg sm:invisible lg:visible">
                        Help
                    </h1>
                </Link>
            </li>

        </aside>
    );
};

export default SideNav;

