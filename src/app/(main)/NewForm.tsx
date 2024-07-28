"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Tiptap from "@/components/Tiptap";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const NewForm = () =>  {

    const formSchema = z.object({
        text: z.string().min(1, { message: "A Message is required" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),  
        mode: "onChange",
        defaultValues: {
            text: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("A new message was submitted with content: ",  values)
    }

    return (
        <div className="w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={field.value}>New Post</FormLabel>
                                    <FormControl>
                                        <Tiptap content={field.value} onChange={field.onChange}></Tiptap>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.text?.message}</FormMessage>
                                </FormItem>
                        )}
                    >
                    </FormField>
                </form>
            </Form>
        </div>
    )

}