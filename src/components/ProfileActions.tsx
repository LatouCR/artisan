"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

type ProfileActionsProps = {
    id: string;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ id }) => {

    const pathname = usePathname();
    const isActive = (href: string) => {
        return pathname === href;
    }

    return (
        <nav className="max-w-post w-full px-4 h-full max-h-16">
            <ul className="flex w-full justify-between">
                <li className={isActive(`/user/${id}`) ? "text-lg font-semibold w-1/3 flex justify-center border-b-2 border-atprimary" : "text-lg font-semibold w-1/3 flex justify-center hover:border-b-2 hover:border-action-highlight hover:text-action-highlight"}>
                    <Link
                        href={`/user/${id}`}
                        className={isActive(`/user/${id}`) ? "text-atprimary" : "text-black/40"}
                    >
                        Posts
                    </Link>
                </li>
                <li className={isActive(`/user/${id}/replied`) ? "text-lg font-semibold w-1/3 flex justify-center border-b-2 border-atprimary" : "text-lg font-semibold w-1/3 flex justify-center hover:border-b-2 hover:border-action-highlight hover:text-action-highlight"}>
                    <Link
                        href={`/user/${id}/replied`}
                        className={isActive(`/user/${id}/replied`) ? "text-atprimary" : "text-black/40"}
                    >
                        Replies
                    </Link>
                </li>
                <li className={isActive(`/user/${id}/liked`) ? "text-lg font-semibold w-1/3 flex justify-center border-b-2 border-atprimary" : "text-lg font-semibold w-1/3 flex justify-center hover:border-b-2 hover:border-action-highlight hover:text-action-highlight"}>
                    <Link
                        href={`/user/${id}/liked`}
                        className={isActive(`/user/${id}/liked`) ? "text-atprimary" : "text-black/40"}
                    >
                        Likes
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default ProfileActions