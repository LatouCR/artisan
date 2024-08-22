/* eslint-disable @next/next/no-img-element */
"use client";

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { UploadButton } from "src/utils/uploadthing"
import type { SubmitHandler } from 'react-hook-form';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";


interface FormData {
    firstName?: string;
    lastName?: string;
    jobPosition?: string;
    githubUrl?: string;
    Ubication?: string;
    Biography?: string;
    HeaderURL?: string;
}

const EditProfile: React.FC = () => {

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const { isLoaded, isSignedIn, user } = useUser();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            await user?.update({
                unsafeMetadata: {
                    jobPosition: data.jobPosition,
                    githubUrl: data.githubUrl,
                    Biography: data.Biography,
                    Ubication: data.Ubication,
                    HeaderURL: imageUrl,
                },
            });
            toast("Success", {
                description: 'Your Profile has been updated',
            });
        } catch (error) {
            toast("Something went wrong", {
                description: `Failed to update your profile`,
            });
            console.error(error);
        }
    };

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div className="w-8 h-8 flex items-center justify-center rounded-full border border-black/40 text-black hover:cursor-pointer hover:text-atprimary hover:border-atprimary" >
                    <Pencil size={18} />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex w-full items-center gap-2">
                            <div>
                                <h1 className="text-xl">{user.username ?? user.fullName}</h1>
                                <p className="text-sm font-thin text-neutral-400">Update Profile</p>
                            </div>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-2'>
                    <div className="flex items-center justify-center h-full w-full ">
                        <img
                            src={(user?.unsafeMetadata as { HeaderURL?: string })?.HeaderURL}
                            alt="User Header or Profile Picture"
                            className="w-full h-full max-h-48 object-cover rounded-t-lg relative opacity-70"
                        />
                        <div className='absolute'>
                            <UploadButton
                                appearance={{
                                    button: 'bg-transparent font-bold text-white w-24 hover:text-ataccent',
                                    container: 'flex w-auto items-start text-transparent',
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
                                    toast("Error", {
                                        description: `Something went wrong`,
                                    });
                                    console.error('Error uploading image:', error);
                                }}
                            >
                            </UploadButton>
                        </div>


                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            defaultValue={user?.firstName ?? ''}

                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        />
                        {errors.firstName && <span className="text-sm text-red-600">This field is required</span>}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            defaultValue={user?.lastName ?? ''}
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        />
                        {errors.lastName && <span className="text-sm text-red-600">This field is required</span>}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="customName">
                            Job Position
                        </label>
                        <input
                            defaultValue={(user?.unsafeMetadata as { jobPosition?: string })?.jobPosition ?? ''}
                            {...register('jobPosition', {
                                required: false,
                            })}
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        />
                        {errors.jobPosition && (
                            <span className="text-sm text-red-600">This field is required</span>
                        )}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="customName">
                            Ubication
                        </label>
                        <input
                            defaultValue={(user?.unsafeMetadata as { Ubication?: string })?.Ubication ?? ''}
                            {...register('Ubication', {
                                required: false,
                            })}
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        />
                        {errors.Ubication && (
                            <span className="text-sm text-red-600">This field is required</span>
                        )}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="customName">
                            Github URL
                        </label>
                        <input
                            defaultValue={(user?.unsafeMetadata as { githubUrl?: string })?.githubUrl ?? ''}
                            {...register('githubUrl', {
                                required: false,
                            })}
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        />
                        {errors.githubUrl && (
                            <span className="text-sm text-red-600">This field is required</span>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="customBio">
                            Biography
                        </label>
                        <textarea
                            rows={6}
                            defaultValue={(user?.unsafeMetadata as { Biography?: string })?.Biography ?? ''}
                            {...register('Biography', {
                                required: false,
                            })}
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        ></textarea>
                        {errors.Biography && <span className="text-sm text-red-600">This field is required</span>}
                    </div>
                    <DialogFooter className="border-t border-t-neutral-200 w-full pt-3">
                        <DialogClose
                            type="submit"
                            className="bg-action-highlight text-white p-2 rounded-3xl w-24">
                            Update
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfile;