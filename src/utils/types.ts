export interface Post {
  id: number;
  text: string;
  imageUrl?: string | null;
  userId: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date | null;
  comments: Comment[];
}

export interface Comment {
  id: number;
  postId: number;
  text: string;
  userId: string;
  userName: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
