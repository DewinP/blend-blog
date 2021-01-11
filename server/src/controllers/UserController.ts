import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import { HttpStatusEnum } from "../types";

class UserController {
  static singleUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.posts", "post")
      .where({ username: req.params.username })
      .getOne();

    if (user) {
      return res.json({ user: user });
    } else {
      return res.status(HttpStatusEnum.NOT_FOUND).json("User does't exist");
    }
  };
}

export default UserController;
