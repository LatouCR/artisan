"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

interface CommentModalProps {
  postId: number;
  userId: string;
  userName: string;
  isOpen: boolean;
  onClose: () => void;
}

type FormValues = {
  text: string;
};

/*
interface CommentResponse {
  id: number;
  text: string;
  postId: number;
  userId: string;
  userName: string;
}
*/

const CommentModal = ({ postId, userId, userName, isOpen, onClose }: CommentModalProps) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          text: data.text,
          userId,
          userName,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create comment");
      }
      const result: unknown = await response.json();
      console.log("Comment created:", result);
      reset();
      onClose();
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="p-4">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-semibold">Add a comment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            placeholder="Comment..."
            {...register("text", { required: true })}
            className="w-full p-2 border rounded-md mb-4"
          />
          <DialogFooter className="flex justify-end space-x-2">
            <DialogClose asChild>
              <button
                type="button"
                className="bg-gray-300 text-gray-800 p-2 rounded-md w-24"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md w-24"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;