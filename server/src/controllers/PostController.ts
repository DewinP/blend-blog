import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Post } from "../entity/Post";
export const createPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log();
    let post = await getRepository(Post)
      .create({
        title: req.body.title,
        body: req.body.body,
        creatorId: req.session!.userId,
      })
      .save();

    return res.send(post);
  } catch (error) {
    return res.status(500).send(error);
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
