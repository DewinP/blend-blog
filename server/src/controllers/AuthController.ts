import argon2 from "argon2";
import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { HttpStatusEnum, IUser, IUserInput } from "../types";
import { User } from "../entity/User";
import { jwtSecret } from "../config";
import * as jwt from "jsonwebtoken";

class AuthController {
  static createToken = async (
    user: IUser,
    expiresIn: number
  ): Promise<string> => {
    const secret: string = jwtSecret;
    const token = jwt.sign(user, secret, { expiresIn });
    return token;
  };

  static login = async (req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body;
    console.log(username, password);
    if (!(username && password)) {
      return res.status(HttpStatusEnum.BAD_REQUEST).json("Empty fields");
    }

    let user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.username = :username", { username: username })
      .addSelect("user.password")
      .getOne();

    if (!user) {
      return res.status(HttpStatusEnum.BAD_REQUEST).json("User not found");
    }
    console.log("qopjtpopotj", user);
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res.status(HttpStatusEnum.BAD_REQUEST).send("Incorrect password");
    }

    let userResponse: IUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const expiresIn: number = 60 * 60 * 24;
    const token = await AuthController.createToken(userResponse, expiresIn);

    return res.json({
      token,
      user: userResponse,
    });
  };

  static register = async (req: Request, res: Response): Promise<Response> => {
    let { email, password, username } = req.body;
    let userInput: IUserInput = {
      email: email,
      username: username,
      password: password,
    };

    const hashedPass = await argon2.hash(userInput.password);
    userInput.password = hashedPass;
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(userInput)
        .execute();
    } catch (error) {
      return res.status(HttpStatusEnum.FORBIDDEN).json({ error: error });
    }
    return res.status(HttpStatusEnum.SUCCESS_NO_CONTENT).json("User created");
  };
}

export default AuthController;
