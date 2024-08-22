/* eslint-disable @next/next/no-img-element */
"use client"
import { useUser } from "@clerk/nextjs"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { UploadButton } from "src/utils/uploadthing"
import PostModalActions from "../PostModalActions"

import type { SubmitHandler } from "react-hook-form"


type FormValues = {
    text: string;
};

interface CreatePostResponse {
    message: string;
    post: {
        id: number;
        text: string;
        userId: string;
        userName: string;
    };
}

const CreatePostModal = () => {

    const { isLoaded, user } = useUser();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { register, handleSubmit, reset } = useForm<FormValues>();

    if (!isLoaded || !user) {
        return null;
    }

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: data.text,
                    userId: user.id,
                    userName: user.username ?? user.fullName,
                    imageUrl: imageUrl,
                }),
            });

            if (!response.ok) {
                toast("Error", { 
                    description: "Failed to create post",
                })
                throw new Error('Failed to create post');
            }
            toast("Success", {
                description: 'Your post has been created',
            });
            reset();
        } catch (error) {
            toast("Error", {
                description: `Something went wrong`,
            })
        }
    };

    return (
        <Dialog>
            <DialogTrigger className="w-full max-w-post">
                <div className="max-w-post w-full max h-auto bg-white p-3 rounded-2xl border-neutral-400/40 border">
                    <div className="w-full flex items-center gap-1.5">
                        <img src={user.imageUrl} alt="" className="w-12 h-12 rounded-full" />
                        <div className="flex px-5 py-3 w-full rounded-3xl max-h-14 h-full bg-white border-action/80 border-2 hover:bg-neutral-100 ">
                            <p className="text-neutral-400 font-light xm:">En que estas pensando, {user.username ?? user.fullName}?</p>
                        </div>
                    </div>
                    <PostModalActions />
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full p-6">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex w-full items-center gap-2">
                            <img src={user.imageUrl} alt="" className="w-12 h-12 rounded-full" />
                            <div>
                                <h1 className="text-xl">{user.username ?? user.fullName}</h1>
                                <p className="text-sm font-thin text-neutral-400">Crea una publicacion</p>
                            </div>
                        </div>
                    </DialogTitle>

                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Textarea
                            placeholder="Sobre que quieres hablar?"
                            {...register("text", { required: true })}
                            className="mb-2 h-96 border-none items-start text-xl p-0 resize-none focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-0 focus-visible:ring-offset-transparent"
                            autoComplete="off"
                        />
                        <div className="flex gap-2 mb-2 hover:cursor-pointer">
                            <img src="/imgicon.svg" alt="" />
                            <UploadButton
                                appearance={{
                                    button: 'bg-transparent text-neutral-400 w-24',
                                    container: 'flex w-auto items-start',
                                    allowedContent: 'hidden'
                                }}
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    toast("Success", {
                                        description: "Image uploaded",
                                    });
                                    setImageUrl(res?.[0]?.url ?? null);
                                }}
                                onUploadError={(error: Error) => {
                                    console.error('Error uploading image:', error);
                                }}
                            >
                            </UploadButton>

                        </div>

                    </div>
                    <DialogFooter className="border-t border-t-neutral-200 w-full pt-3">
                        <DialogClose
                            type="submit"
                            className="bg-action-highlight text-white p-2 rounded-3xl w-24">
                            Publicar
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePostModal