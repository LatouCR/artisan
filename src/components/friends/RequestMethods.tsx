"use client";
import { UserCheck, UserX } from 'lucide-react';
import { toast } from 'sonner';

interface FriendRequestResponseProps {
  requestId: number;
  userId: string;
}

export function RequestMethods({ requestId, userId }: FriendRequestResponseProps) {

  const respondToFriendRequest = async (action: 'accept' | 'reject') => {
    try {
      const response = await fetch('/api/friends', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, action, userId }),
      });

      if (response.ok) {
        const message = action === 'accept' ? "Friend request accepted" : "Friend request rejected";
        toast(message, {
          description: `You have ${action}ed the friend request`,
        });
      } else {
        toast("Failed to respond to request", {
          description: "An error occurred while responding to the friend request",
        });
      }
    } catch (error) {
      toast("Error responding to request", {
        description: "An error occurred while responding to the friend request",
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => respondToFriendRequest('accept')}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
      >
        <UserCheck size={18} />
      </button>
      <button
        onClick={() => respondToFriendRequest('reject')}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
      >
        <UserX size={18} />
      </button>
    </div>
  );
}