"use client"

import { useUser } from "@clerk/nextjs"

import { db } from "src/server/db"

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

import { useForm, SubmitHandler } from "react-hook-form"

import { posts } from "src/server/db/schema"

type FormValues = {
    text: string
}

const CreatePost = () => {
    const { register, handleSubmit, reset } = useForm<FormValues>();

    const { isLoaded, user } = useUser();
    if (!isLoaded || !user) {
        return null;
    }

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await db.insert(posts).values({
            text: data.text,
            userId: user.id,
            userName: user.fullName ?? "Anonimo",
        })
        reset();
    }

    if (!user) return null;

    return (
        <Dialog>
            <DialogTrigger>
                <div
                    className="bg-purple-800 text-white p-2 rounded-md">
                    Crear Post
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
                    <div className="mb-2">
                        <Input
                            type="text"
                            placeholder="Mensaje..."
                            {...register("text", { required: true })}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <div className="bg-red-800 text-white p-2 rounded-md w-24">
                                Cancelar
                            </div>
                        </DialogClose>
                        <button
                            type="submit"
                            className="bg-green-800 text-white p-2 rounded-md w-24"
                        >
                            Crear
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePost