import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";

class UserController {
  static userAuthenticated = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where({ id: req.user_ID })
      .getOne();

    if (user) {
      return res.json({ user: user });
    } else {
      return res.json({ id: req.user_ID, text: "d23f23" });
    }
  };

  static singleUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.posts", "post")
      .where({ id: req.user_ID })
      .getOne();

    if (user) {
      return res.json({ user: user });
    } else {
      return res.json({ id: req.user_ID, text: "d23f23" });
    }
  };
}

export default UserController;
