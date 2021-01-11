import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { HttpStatusEnum } from "../types";
import { Post } from "../entity/Post";
class PostController {
  static createPost = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let { title, body } = req.body;
    if (!(body && title)) {
      return res.status(HttpStatusEnum.BAD_REQUEST).json("Empty fields");
    }
    try {
      let post = await getRepository(Post)
        .create({
          title: req.body.title,
          body: req.body.body,
          creatorId: req.user_ID,
        })
        .save();
      return res.status(HttpStatusEnum.CREATED).json({ post: post });
    } catch (error) {
      return res.status(HttpStatusEnum.SERVER_ERROR).json({ error: error });
    }
  };

  static allPosts = async (_, res: Response): Promise<Response> => {
    try {
      console.log(res.locals);
      const posts: Post[] = await getRepository(Post).find();
      return res.json({ posts: posts });
    } catch (error) {
      return res.status(HttpStatusEnum.NOT_FOUND).json({ error: error });
    }
  };

  static singlePost = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const post = await getRepository(Post).findOne({
      where: {
        id: req.params.id,
      },
    });

    if (post) {
      return res.json({ post: post });
    } else
      return res.status(HttpStatusEnum.NOT_FOUND).json("Post doesnt not exist");
  };

  static updatePost = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let { title, body } = req.body;
    if (!(title && body)) {
      return res.status(HttpStatusEnum.BAD_REQUEST).json("Empty fields");
    }

    const result = await getRepository(Post)
      .createQueryBuilder()
      .update(Post)
      .set({ title: title, body: body })
      .where('id = :id and "creatorId" = :creatorId', {
        id: req.params.id,
        creatorId: req.user_ID,
      })
      .returning("*")
      .execute();
    let post: Post = result.raw[0];
    if (post) {
      return res.json({ post: post });
    } else return res.status(HttpStatusEnum.UNAUTHORIZED).json("Unathorized");
  };

  static deletePost = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const post = await getRepository(Post).findOne(req.params.id);
    if (!post) {
      res.status(HttpStatusEnum.NOT_FOUND).json("Post not found");
    } else if (post.creatorId !== req.user_ID) {
      res.status(HttpStatusEnum.UNAUTHORIZED).json("Post not found");
    }
    await Post.delete(req.params.id);

    return res.json("Post deleted successfuly");
  };
}

export default PostController;
