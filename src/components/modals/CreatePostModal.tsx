/* eslint-disable @next/next/no-img-element */
"use client"
import { useUser } from "@clerk/nextjs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { UploadButton } from "src/utils/uploadthing"
import type { SubmitHandler } from "react-hook-form"
import { Newspaper } from "lucide-react"
import { Image as Img } from "lucide-react"

type FormValues = {
    text: string;
};

interface CreatePostResponse {
    message: string;
    post: {
        id: number; // Assuming your post has an ID field
        text: string;
        userId: string;
        userName: string;
        // Add any other fields that your post might have
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
                throw new Error('Failed to create post');
            }

            const result = await response.json() as CreatePostResponse;
            console.log('Post created:', result.post);
            reset(); // Reset the form after successful submission
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <div className="w-[660px] h-auto">
                    <div className="w-full flex items-center gap-1.5">
                        <img src={user.imageUrl} alt="" className="w-14 h-14 rounded-full" />
                        <div className="flex px-5 py-3 w-full rounded-3xl max-h-14 h-full bg-white border-action/80 border-2 ">
                            <p className="text-neutral-400 font-light">En que estas pensando, {user.username ?? user.fullName}?</p>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 mb-2 px-4">
                        <span className="flex items-center gap-1 max-w-36 h-7 rounded-lg hover:bg-slate-300">
                            <Img size={28} color="#37334A"/>
                            <p>Post Picture</p>
                        </span>
                        <span className="flex items-center gap-1 max-w-36 h-7 rounded-lg hover:bg-slate-300">
                            <Newspaper size={28} color="#780000"/>
                            <p>Write Article</p>
                        </span>

                    </div>

                </div>


            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear un Post</DialogTitle>
                    <DialogDescription>
                        Crea una publicacion dentro de la base de datos. Esta publicacion es solo para pruebas.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            type="text"
                            placeholder="Mensaje..."
                            {...register("text", { required: true })}
                            className="mb-2"
                        />
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                setImageUrl(res?.[0]?.url ?? null);
                            }}
                            onUploadError={(error: Error) => {
                                console.error('Error uploading image:', error);
                            }}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <div className="bg-red-800 text-white p-2 rounded-md w-24">
                                Cancelar
                            </div>
                        </DialogClose>
                        <DialogClose
                            type="submit"
                            className="bg-green-800 text-white p-2 rounded-md w-24">
                            Crear
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePostModal