import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { HttpStatusEnum } from "../types";
import { Post } from "../entity/Post";
import { HttpExeption } from "../exception/HttpExeption";
import { User } from "../entity/User";
class PostController {
  static createPost = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      await getRepository(Post)
        .create({
          title: req.body.title,
          body: req.body.body,
          creatorId: req.user_ID,
        })
        .save();
      return res.json(new HttpExeption(HttpStatusEnum.CREATED, "Post Created"));
    } catch (error) {
      return res.json(new HttpExeption(HttpStatusEnum.SERVER_ERROR, error));
    }
  };

  static allPosts = async (_, res: Response): Promise<Response> => {
    try {
      console.log(res.locals);
      const posts: Post[] = await getRepository(Post)
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.creator", "user")
        .getMany();
      return res.json(
        new HttpExeption(
          HttpStatusEnum.SUCCESS,
          `${posts.length} posts found`,
          posts
        )
      );
    } catch (error) {
      return res.json(new HttpExeption(HttpStatusEnum.NOT_FOUND, error));
    }
  };

  static singlePost = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const post = await getRepository(Post)
      .createQueryBuilder("post")
      .where({ id: req.params.id })
      .leftJoinAndSelect("post.creator", "user")
      .getOne();

    if (post) {
      return res.json(
        new HttpExeption(HttpStatusEnum.SUCCESS, `Found Post`, post)
      );
    } else
      return res.json(
        new HttpExeption(HttpStatusEnum.NOT_FOUND, "Post doesnt not exist")
      );
  };
  static editPost = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let {title, body} = req.body

    const post = await getRepository(Post)
    .createQueryBuilder()
    .update(Post)
    .set({title: title, body: body})
    .where("id = :id", { id: 1 })
    .execute();

    if (post) {
      return res.json(
        new HttpExeption(HttpStatusEnum.SUCCESS, `Found Post`, post)
      );
    } else
      return res.json(
        new HttpExeption(HttpStatusEnum.NOT_FOUND, "Post doesnt not exist")
      );
  };
}

}

export default PostController;
