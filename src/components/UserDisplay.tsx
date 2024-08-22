import Link from "next/link"
import UserImg from "./UserImg";

interface UserInfoProps {
    userId?: string | null,
    userName?: string | null,
    jobPosition?: string,
    children?: React.ReactNode,
}

export default function UserDisplay({ userId, userName, jobPosition, children }: UserInfoProps) {

    if (!userId) {
        return null;
    }


    return (
        <div className="flex items-center px-3 py-2">
            <div className="flex items-center w-full justify-between">
                <Link
                    href={`/user/${userId}`}
                    className="flex items-center gap-2"
                >
                    <UserImg userId={userId} className="max-w-12 max-h-12" />
                    <div>
                        <h2 className="font-semibold hover:text-blue-700">{userName}</h2>
                        {jobPosition ? (
                            <p className="text-sm text-slate-400 overflow-hidden max-h-6">{jobPosition}</p>
                        ) :
                            <p className="text-sm text-slate-400">Job Position</p>
                        }
                    </div>
                </Link>
                {children}
            </div>
        </div>
    )
}