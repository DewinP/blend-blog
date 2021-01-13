import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

class UserController {
  static userPosts = async (
    req: Request,
    res: Response
  ): Promise<Response<any>> => {
    try {
      const user = await getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: req.user_ID })
        .leftJoinAndSelect("user.posts", "posts")
        .getOne();

      return res.json({ posts: user?.posts });
    } catch {
      return res.json({ posts: [] });
    }
  };
}

export default UserController;
