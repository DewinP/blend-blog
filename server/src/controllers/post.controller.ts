import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Post } from "../entity/Post";

export const createPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let post = await getRepository(Post)
    .create({
      title: req.body.title,
      body: req.body.body,
      creatorId: req.session?.userId,
    })
    .save();
  return res.send(post);
};
