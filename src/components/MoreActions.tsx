import { Ellipsis } from "lucide-react"
import { FriendRequest } from "@/components/friends/FriendRequest"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"

export default function MoreActions({ friendId, currentUser, userName }: { friendId?: string | null; currentUser?: string | null; userName?: string | null }) {

    if (!friendId || !currentUser || !userName) {
        return null
    }

    return (
        <>
            <Menubar className="border-none">
                <MenubarMenu>
                    <MenubarTrigger className="flex items-center justify-center text-neutral-300 hover:text-action cursor-pointer">
                        <Ellipsis size={16} />
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            <FriendRequest friendId={friendId} currentUser={currentUser} userName={userName} />
                        </MenubarItem>
                        <MenubarItem>
                            Edit
                        </MenubarItem>
                        <MenubarItem>
                            Delete
                        </MenubarItem>
                        <MenubarItem>
                            Report
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </>

    )
}