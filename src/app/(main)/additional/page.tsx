/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface FormData {
    firstName?: string;
    lastName?: string;
    jobPosition?: string;
    Biography?: string;
    HeaderURL?: string;
}

const AdditionalUpdate: React.FC = () => {
    const router = useRouter();
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
                    Biography: data.Biography,
                    HeaderURL: data.HeaderURL,
                },
            });
            router.push(`/user/${user?.id}`);
        } catch (error) {
            console.log(error);
        }
    };

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <div className="mx-10">
                    <h1 className="py-4 text-2xl font-bold">Update Additional Information</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                Custom Name
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
                        <div className="mt-4">
                            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="customBio">
                                Custom Bio
                            </label>
                            <textarea
                                rows={6}
                                defaultValue={(user?.unsafeMetadata as { Biography?: string })?.Biography ?? ''}
                                {...register('Biography', {
                                })}
                                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                            ></textarea>
                            {errors.Biography && <span className="text-sm text-red-600">This field is required</span>}
                        </div>
                        <div className="mt-4">
                            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="customBio">
                                Custom Bio
                            </label>
                            <textarea
                                rows={6}
                                defaultValue={(user?.unsafeMetadata as { HeaderURL?: string })?.HeaderURL ?? ''}
                                {...register('HeaderURL', {
                                    required: true,
                                })}
                                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                            ></textarea>
                            {errors.Biography && <span className="text-sm text-red-600">This field is required</span>}
                        </div>
                        <button
                            type="submit"
                            className="my-4 bg-purple-500 px-8 py-2 text-lg font-semibold text-white transition-all hover:bg-purple-700"
                        >
                            Update
                        </button>
                    </form>
                </div>

            </div>
        </main>

    );
};

export default AdditionalUpdate;

