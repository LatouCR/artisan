"use client";
import React, { useEffect, useState } from "react";
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

const ActionBar: React.FC<ActionBarProps> = ({
  postId,
  postDate,
  userId,
  userName,
  commentsCount,
}) => {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchLikes() {
      try {
        const response = await fetch(`/api/likes?postId=${postId}`);
        const data = (await response.json()) as Like[];
        setLikes(data.length);
        setIsLiked(data.some((like) => like.userId === userId));
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    }
    void fetchLikes();
  }, [postId, userId]);

  const handleLike = async () => {
    if (!userId) {
      alert("You must be logged in to like posts");
      return;
    }

    try {
      if (isLiked) {
        await fetch("/api/likes", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId, userId }),
        });
        setLikes((prev) => prev - 1);
      } else {
        await fetch("/api/likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId, userId }),
        });
        setLikes((prev) => prev + 1);
      }
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <div className="flex items-center px-4">
      <div className="w-full border-t border-x-neutral-400">
        <div className="my-2 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            <p>{postDate.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              onClick={() => setIsCommentModalOpen(true)}
              className="flex gap-1.5 rounded-full text-black/40 hover:cursor-pointer hover:bg-action/20 hover:text-action-highlight"
            >
              {commentsCount >= 0 && (
                <p className="text-black/20">{commentsCount}</p>
              )}
              <MessageCircleMore />
            </span>
            <span
              onClick={handleLike}
              className={`flex cursor-pointer gap-1.5 rounded-full hover:bg-action-likes/10 hover:text-action-likes ${
                isLiked ? "text-action-likes" : "text-black/40"
              }`}
            >
              {likes >= 0 && (
                <p className="text-black/20 hover:text-action-likes">{likes}</p>
              )}
              <Heart fill={isLiked ? "currentColor" : "none"} />
            </span>
            <span className="flex cursor-pointer gap-1.5 rounded-full text-black/40 hover:bg-action/20 hover:text-action-highlight">
              <Bookmark />
            </span>
          </div>
        </div>
      </div>
      {isCommentModalOpen && (
        <CommentModal
          postId={postId}
          userId={userId!}
          userName={userName}
          isOpen={isCommentModalOpen}
          onClose={() => setIsCommentModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ActionBar;