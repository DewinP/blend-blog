import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { HttpStatusEnum, TokenDataStore } from "../types";
import { Post } from "../entity/Post";
import { HttpExeption } from "../exception/HttpExeption";
import jwtDecode from "jwt-decode";
class PostController {
  static createPost = async (
    req: Request,
    res: Response
  ): Promise<Post | HttpExeption> => {
    const getToken: any = req.headers["Authorization"];
    const userData: TokenDataStore = jwtDecode(getToken);
    try {
      let post = getRepository(Post).create({
        title: req.body.title,
        body: req.body.body,
        creatorId: userData.id,
      });
      return post;
    } catch (error) {
      return new HttpExeption(HttpStatusEnum.SERVER_ERROR, error);
    }
  };

  static allPosts = async (
    req: Request,
    res: Response
  ): Promise<Post[] | any> => {
    try {
      const posts = await getRepository(Post).find();
      console.log(posts);
      return posts;
    } catch (error) {
      return res.status(HttpStatusEnum.SERVER_ERROR).json("Server error");
    }
  };
}

export default PostController;
