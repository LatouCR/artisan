/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useEffect } from 'react';
import { z } from 'zod';

// Define the schema for a single notification
const notificationSchema = z.object({
  id: z.number(),
  senderId: z.string(),
  receiverId: z.string(),
  status: z.string(),
  createdAt: z.string().transform(str => new Date(str)),
  updatedAt: z.string().nullable().transform(str => str ? new Date(str) : null),
});

// Define the schema for the array of notifications
const notificationsSchema = z.array(notificationSchema);

// Infer the type from the schema
type Notification = z.infer<typeof notificationSchema>;

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`/api/notifications?userId=${userId}`);

    eventSource.onmessage = (event: MessageEvent) => {
      try {
        // Explicitly type the parsed data as unknown
        const rawData: unknown = JSON.parse(event.data);
        
        // Validate and parse the data
        const parsedData = notificationsSchema.parse(rawData);
        
        setNotifications(parsedData);
      } catch (error) {
        console.error('Error parsing notification data:', error);
        // Handle the error appropriately (e.g., show an error message to the user)
      }
    };

    return () => {
      eventSource.close();
    };
  }, [userId]);

  return notifications;
}