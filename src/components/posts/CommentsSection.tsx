"use client";

import { useState } from 'react';
import UserImg from "@/components/UserImg";
import { Heart, Reply, TriangleAlert } from "lucide-react";
import type { Comment } from 'src/utils/types';

interface CommentsSectionProps {
  comments: Comment[];
}

export default function CommentsSection({ comments }: CommentsSectionProps) {
  const [showComments, setShowComments] = useState(false);

  if (comments.length <= 0) {
    return null;
  }

  const toggleComments = () => {
    setShowComments((prevState) => !prevState);
  };

  return (
    <>
      <div className="px-4 pb-2 flex justify-between text-black/40">
        <div
          className="flex gap-4 hover:cursor-pointer"
          onClick={toggleComments}>
          <p className="font-semibold">
            {showComments ? "hide replies" : "view replies"}
          </p>
        </div>
      </div>

      {showComments && comments.map((comment) => (
        <div className="flex flex-col w-full my-2" key={comment.id}>
          <div className="flex w-full px-2 gap-2">
            <UserImg userId={comment.userId} className="w-12 h-12" />
            <div id="post-comment">
              <div className="w-full leading-5">
                <h2 className="font-semibold">{comment.userName}</h2>
                <p className="text-xs text-slate-400">Job Position</p>
              </div>
              <div className="max-w-xl">
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          </div>

          <div className="px-4 flex justify-between text-black/40">
            <div className="flex gap-4 hover:cursor-pointer">
              <div>---</div>
              <p className="font-semibold">{showComments ? "hide replies" : "view replies"}</p>
            </div>
            <div className="flex gap-6">
              <span className="flex gap-2 hover:text-teal-700 cursor-pointer items-center my-auto">
                <p className="text-black/20">Reply</p>
                <Reply strokeWidth={3} className="text-slate-400 hover:text-teal-700" />
              </span>
              <span className="flex gap-2 text-black/40 hover:text-teal-700 cursor-pointer">
                <p className="text-black/20">20</p>
                <Heart />
              </span>
              <TriangleAlert />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}