"use client";
import { UserRoundPlus } from 'lucide-react';
import { toast } from 'sonner';

export function FriendRequest({ friendId, currentUser, userName, variant }: { friendId: string; currentUser?: string; userName?: string; variant?: string }) {


    const sendFriendRequest = async () => {
        try {
            const response = await fetch('/api/friends', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ receiverId: friendId, senderId: currentUser, userName: userName }),

            });
            if (response.ok) {
                toast("Friend request sent", {
                    description: "Your friend request has been sent successfully",
                });
            } else {
                toast("Failed to send request", {
                    description: "An error occurred while sending your friend request",
                });
            }
        } catch (error) {
            toast("Error sending request", {
                description: "An error occurred while sending your friend request",
            });
        }
    };

    return (
        <div>
            {variant === "default" ? (
                <button
                    onClick={sendFriendRequest}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-black/40 text-black hover:text-atprimary hover:border-atprimary"
                >
                    <UserRoundPlus size={18} />
                </button>
            ) : (
                <div
                    onClick={sendFriendRequest}
                    className="flex items-center justify-center hover:text-atprimary hover:border-atprimary"
                >
                    Add Friend
                </div>
            )}

        </div >
    );
};