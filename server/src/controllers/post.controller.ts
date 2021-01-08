import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { IPost } from "../../types";
import { Post } from "../entity/Post";
import { HttpException } from "../exceptions/HttpExeption";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IPost> | void> => {
  try {
    console.log("session", req.session?._userID);
    let post = await getRepository(Post)
      .create({
        title: req.body.title,
        body: req.body.body,
        creatorId: req.session!.userId,
      })
      .save();
    let postRes: IPost = {
      id: post.id,
      title: post.title,
      body: post.body,
      creatorId: post.creatorId,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
    console.log(postRes);
    return res.send(postRes);
  } catch (error) {
    next(new HttpException(500, error));
  }
};

// export const posts = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response<IPost> | void> => {
//   try {
//     let post = await getRepository(Post).find();
//     let postRes: [Post] = {
//       id: post.id,
//       title: post.title,
//       body: post.body,
//       creatorId: post.creatorId,
//       createdAt: post.createdAt,
//       updatedAt: post.updatedAt,
//     };
//     return res.send(postRes);
//   } catch (error) {
//     next(error);
//   }
// };
