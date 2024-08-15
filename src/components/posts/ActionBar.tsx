"use client";
import React, { useEffect, useState } from 'react'
import { Heart, MessageCircleMore, Bookmark } from "lucide-react";
import CommentModal from "@/components/modals/CommentModal";

interface ActionBarProps {
    postDate: Date;
    postId: number;
    userId: string | null;
    userName: string;
    commentsCount: number;
}

interface Like {
    userId: string;
}

const ActionBar = ({ postId, postDate, userId, userName, commentsCount  }: ActionBarProps) => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    useEffect(() => {
        async function fetchLikes() {
            const response = await fetch(`/api/likes?postId=${postId}`);
            const data = await response.json();
    
            if (Array.isArray(data)) {
                setLikes(data.length);
                setIsLiked(data.some((like: Like) => like.userId === userId));
            } else {
                console.error("Expected an array but got:", data);
            }
        }
    
        fetchLikes();
    }, [postId, userId]);
    
    const handleLike = async () => {
        if (!userId) {
            alert("You must be logged in to like posts");
            return;
        }

        if (isLiked) {
            await fetch('/api/likes', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, userId }),
            });
            setLikes(likes - 1);
        } else {
            await fetch('/api/likes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, userId }),
            });
            setLikes(likes + 1);
        }

        setIsLiked(!isLiked);
    };

    return (
        <div className="flex items-center px-4">
            <div className="w-full border-t border-x-neutral-400">
                <div className="my-2 flex items-center justify-between">
                    <div className="text-slate-400 text-xs">
                        <p>{postDate.toString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span
                            onClick={() => setIsCommentModalOpen(true)} 
                            className="flex gap-1.5 text-black/40 hover:text-action-highlight rounded-full hover:bg-action/20 hover:cursor-pointer"
                        >
                            {commentsCount >= 0 && <p className="text-black/20">{commentsCount}</p>}
                            <MessageCircleMore />
                        </span>
                        <span
                            onClick={handleLike}
                            className={`flex gap-1.5 rounded-full hover:bg-action-likes/10 hover:text-action-likes cursor-pointer ${isLiked ? 'text-action-likes' : 'text-black/40'}`}
                        >
                            {likes >= 0 && <p className="text-black/20 hover:text-action-likes">{likes}</p>}
                            <Heart fill={isLiked ? 'currentColor' : 'none'} />
                        </span>
                        <span
                            className="flex gap-1.5 hover:text-action-highlight rounded-full hover:bg-action/20 cursor-pointer text-black/40"
                        >
                            <Bookmark />
                        </span>
                    </div>
                </div>
            </div>

            {isCommentModalOpen && (
                <CommentModal postId={postId} userId={userId as string} userName={userName} isOpen={isCommentModalOpen} onClose={() => setIsCommentModalOpen(false)} />
            )}
        </div>
    );
};

export default ActionBar;