// pages/api/notifications.ts
import { friendRequests } from "src/server/db/schema";
import { db } from "src/server/db";
import { and, eq } from 'drizzle-orm';

import type { NextApiRequest, NextApiResponse } from 'next';

type NotificationData = {
  id: number;
  senderId: string;
  receiverId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userId = req.query.userId as string | undefined;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const sendNotification = async () => {
    try {
        const pendingRequests = await db.select().from(friendRequests)
        .where(
            and(
                eq(friendRequests.receiverId, userId),
                eq(friendRequests.status, 'pending'),
            )
        );

     const data: NotificationData[] = pendingRequests.map(request => ({
        id: request.id,
        senderId: request.senderId,
        receiverId: request.receiverId,
        status: request.status,
        createdAt: request.createdAt,
        updatedAt: request.updatedAt
      }));

      res.write(`data: ${JSON.stringify(data)}\n\n`);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.write(`data: ${JSON.stringify({ error: 'Failed to fetch notifications' })}\n\n`);
    }
  };

  // Send initial data
  await sendNotification();

  // Check for new notifications every 30 seconds
  const intervalId = setInterval(() => {
    sendNotification().catch(error => {
      console.error('Error in interval:', error);
    });
  }, 30000);
  
  // Clean up on close
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
};

export default handler;