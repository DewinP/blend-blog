import argon2 from "argon2";
import { IUserInput } from "../types";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";

class UserController {
  static getSingleUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      const user = getRepository(User).findOneOrFail(id);
      res.send(user);
      return;
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  static newUser = async (req: Request, res: Response) => {
    let { email, password, username } = req.body;
    let user: IUserInput = {
      email: email,
      username: username,
      password: password,
    };

    const hashedPass = await argon2.hash(user.password);
    user.password = hashedPass;
    try {
      await getRepository(User).create(user).save();
    } catch (err) {
      res.status(409).send("already in use");
    }

    return res.send("User created");
  };
}

export default UserController;
