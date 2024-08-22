import React from 'react'
import { clerkClient } from '@clerk/nextjs/server'
import UserDisplay from './UserDisplay'
import { Ellipsis } from 'lucide-react'

export default async function UserRecommendation() {

    const { data } = await clerkClient.users.getUserList({
        orderBy: 'created_at',
        limit: 4,
    })

    return (
        <article className='max-w-80 w-full max-h-80 h-full bg-red-200 px-2 py-4 rounded-sm border border-black/20'>
            <h2 className='font-semibold text-ataccent text-lg px-3 pb-2'>Who to follow</h2>
            <div className='flex flex-col'>
                {data.map((user) => (
                    <div
                        key={user.id}
                        className="max-w-post w-full h-auto overflow-hidden">
                        <UserDisplay
                            userId={user.id}
                            userName={user.fullName}
                            jobPosition={(user?.unsafeMetadata as { jobPosition?: string })?.jobPosition}
                        >
                            <div className="flex items-center justify-center text-neutral-300 hover:text-action cursor-pointer">
                                <Ellipsis size={16} />
                            </div>
                        </UserDisplay>
                    </div>
                ))}
            </div>
        </article>
    )
}