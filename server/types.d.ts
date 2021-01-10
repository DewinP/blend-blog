import { IUser } from "./types.d";
import { Timestamp } from "typeorm";
import { User } from "./src/entity/User";
import { Post } from "./src/entity/Post";
import { Request, Response } from "express";
import { Session } from "express-session";

export interface IUser {
  id: number;
  email: string;
  posts: Post[] | [];
  createdAt: Date;
}
export interface IUserInput {
  email: string;
  password: string;
  username: string;
}
interface IPost {
  id: number;
  title: string;
  body: string;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: number;
  dateCreated: number;
  username: string;
  issued: number;
  expires: number;
}
export interface EncodeResult {
  token: string;
  expires: number;
  issued: number;
}
