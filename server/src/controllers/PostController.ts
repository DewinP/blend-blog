import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { HttpStatusEnum, IFieldError } from "../types";
import { Post } from "../entity/Post";
import { validatePost } from "../utils/validatePost";

class PostController {
  static createPost = async (
    req: Request,
    res: Response
  ): Promise<Response<Post | IFieldError[]>> => {
    let { title, body } = req.body;
    let errors = validatePost(req.body);
    if (errors) return res.json({ errors });
    try {
      let post = await getRepository(Post)
        .create({
          title: title,
          body: body,
          creatorId: req.user_ID,
        })
        .save();
      return res.json(post);
    } catch (error) {
      if (error.code === "23505") {
        return res.json({
          errors: [
            {
              field: "title",
              message: "title is already taken",
            },
          ],
        });
      }
      return res.json(HttpStatusEnum.SERVER_ERROR);
    }
  };
  static allPosts = async (
    _,
    res: Response
  ): Promise<Response<Post[] | undefined>> => {
    try {
      const posts: Post[] = await getRepository(Post).find();
      return res.json({ posts: posts });
    } catch (error) {
      return res.json(HttpStatusEnum.SERVER_ERROR);
    }
  };

  static singlePost = async (
    req: Request,
    res: Response
  ): Promise<Response<Post>> => {
    const post = await getRepository(Post).findOne({
      where: {
        id: req.params.id,
      },
    });
    if (post) {
      return res.json({ post });
    } else return res.json(HttpStatusEnum.NOT_FOUND);
  };

  static updatePost = async (
    req: Request,
    res: Response
  ): Promise<Response<IFieldError | Post>> => {
    let { title, body } = req.body;
    let errors = validatePost(req.body);
    if (errors) return res.json({ errors: errors });
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
    } else return res.json(HttpStatusEnum.UNAUTHORIZED);
  };

  static deletePost = async (
    req: Request,
    res: Response
  ): Promise<Response<HttpStatusEnum>> => {
    const post = await getRepository(Post).findOne(req.params.id);
    if (!post) {
      res.json(HttpStatusEnum.NOT_FOUND);
    } else if (post.creatorId !== req.user_ID) {
      res.json(HttpStatusEnum.UNAUTHORIZED);
    }
    await Post.delete(req.params.id);

    return res.json(HttpStatusEnum.SUCCESS);
  };
}

export default PostController;
