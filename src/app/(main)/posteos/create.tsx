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

import { useForm, SubmitHandler } from "react-hook-form"


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

const CreatePost = () => {
   
    const { isLoaded, user } = useUser();
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
              userName: user.fullName ?? "Anonimo",
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
                <div className="bg-purple-800 text-white p-2 rounded-md">
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
                    <div>
                        <Input 
                            type="text" 
                            placeholder="Mensaje..." 
                            {...register("text", { required: true })}
                            className="mb-2"
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

export default CreatePost