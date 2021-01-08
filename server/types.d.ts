import { Timestamp } from "typeorm";
import { User } from "./src/entity/User";
import { Post } from "./src/entity/Post";

declare global {
  namespace Express {
    interface Session {
      _userID?: number;
    }
  }
}
export type IUserResponse = IUser | User;
export interface IUser {
  id: number;
  email: string;
  posts: Post[] | [];
  createdAt: Date;
}

export interface IError {
  Message: string;
  error: string;
}

interface IPost {
  id: number;
  title: string;
  body: string;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
}
