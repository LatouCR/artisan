"use client";
import React, { useState } from 'react'
import { Heart, MessageCircleMore, Bookmark } from "lucide-react";

interface ActionBarProps {
    postDate: Date
}

const ActionBar = ({ postDate }: ActionBarProps) => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
        console.log("Like button pressed");
    };

    const handleComment = () => {
        setComments(comments + 1);
        console.log("Comment button pressed");
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        console.log("Bookmark button pressed");
    };

    return (
        <div className="flex items-center px-4">
            <div className="w-full border-t border-x-neutral-400">
                <div className="my-2 flex items-center justify-between">
                    <div className="text-slate-400 text-xs">
                        <p>{new Date(postDate).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        
                        <span
                            onClick={handleComment}
                            className="flex gap-1.5 text-black/40 hover:text-action-highlight rounded-full hover:bg-action/20  hover:cursor-pointer"
                        >
                            {comments > 0 && <p className="text-black/20">{comments}</p>}
                            <MessageCircleMore />
                        </span>

                        <span
                            onClick={handleLike}
                            className={`flex gap-1.5 rounded-full hover:bg-action-likes/10 hover:text-action-likes cursor-pointer ${isLiked ? 'text-action-likes' : 'text-black/40'
                                }`}
                        >
                            {likes > 0 && <p className="text-black/20 hover:text-action-likes">{likes}</p>}
                            <Heart fill={isLiked ? 'currentColor' : 'none'} />
                        </span>

                        <span
                            onClick={handleBookmark}
                            className={`flex gap-1.5 hover:text-action-highlight rounded-full hover:bg-action/20 cursor-pointer ${isBookmarked ? 'text-action' : 'text-black/40'
                                }`}
                        >
                            <Bookmark fill={isBookmarked ? 'currentColor' : 'none'} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActionBar