export type User = {
  id: string;
  email: string;
  username: string;
  name: string;
  bio?: string;
  profilePicture?: string;
  bannerImage?: string;
  location?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
  friendCount: number;
  followerCount: number;
};

export type Post = {
  id: string;
  authorId: string;
  author: User;
  content: string;
  image?: string;
  video?: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  comments: Comment[];
  shares: number;
  isLikedByCurrentUser?: boolean;
};

export type Comment = {
  id: string;
  postId: string;
  authorId: string;
  author: User;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
};

export type FriendRequest = {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: "pending" | "accepted" | "declined";
  createdAt: Date;
  updatedAt: Date;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  sender: User;
  content: string;
  image?: string;
  createdAt: Date;
  readAt?: Date;
};

export type Conversation = {
  id: string;
  participantIds: string[];
  participants: User[];
  lastMessage?: Message;
  isGroup: boolean;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Notification = {
  id: string;
  userId: string;
  type:
    | "friend_request"
    | "friend_request_accepted"
    | "like"
    | "comment"
    | "message"
    | "tag";
  relatedUserId?: string;
  relatedPostId?: string;
  relatedMessageId?: string;
  message: string;
  read: boolean;
  createdAt: Date;
};
