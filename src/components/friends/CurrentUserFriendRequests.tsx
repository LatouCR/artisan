import { RequestMethods } from './RequestMethods';
import { db } from "src/server/db";
import { eq } from "drizzle-orm";
import { friendRequests } from 'src/server/db/schema';
import UserImg from '../UserImg';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';


export default async function CurrentUserFriendRequests({ currentUserId }: { currentUserId: string }) {

  const requests = await db.query.friendRequests.findMany({
    where: eq(friendRequests.receiverId, currentUserId),
  })

  console.table(requests);

  return (

    <div className='max-w-4xl w-full'>
      <Table className='p-2 bg-white rounded-md'>
        <TableHeader>
          <TableRow className='text-black'>
            <TableHead className='text-atprimary text-lg font-semibold'>Friend Requests</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>No pending friend requests.</TableRow>
          ) : (
            <TableRow className='max-h-16'>
              {requests.map(request => (
                <>
                  <TableCell key={request.id} className='h-full'>
                    {request.status === 'pending' ? (
                      <span className='flex items-center gap-2'>
                        <UserImg className='h-12 w-12' userId={request.senderId} />
                        <span className='text-lg flex gap-1'>
                          <Link href={`/user/${request.senderId}`}
                            className='text-atprimary font-semibold hover:underline'>{request.userName}</Link>
                          wants to be your friend
                        </span>
                      </span>
                    ) : (
                      <span className='flex items-center gap-2'>
                        <UserImg className='h-12 w-12' userId={request.senderId} />
                        <span className='text-lg flex gap-1'>
                          <Link href={`/user/${request.senderId}`}
                            className='text-atprimary font-semibold hover:underline'>{request.userName}</Link>
                          is already your friend
                        </span>
                      </span>
                    )}
                  </TableCell>

                  <TableCell key={request.id} className='justify-end items-center max-h-20 h-20 w-full flex'>
                    {request.status === 'accepted' && (
                      <p className='font-light text-gray-800'>Request already accepted</p>
                    )}
                    {request.status === 'pending' && (
                      <RequestMethods
                        requestId={request.id}
                        userId={currentUserId}
                      />
                    )}
                  </TableCell>
                </>
              ))}
            </TableRow>
          )}
        </TableBody>

      </Table>

    </div>


  );
}