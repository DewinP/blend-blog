import argon2 from "argon2";
import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { HttpStatusEnum, IUser, IUserInput } from "../types";
import { User } from "../entity/User";
import { HttpExeption } from "../exception/HttpExeption";
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
    let { usernameOrEmail, password } = req.body;
    if (!(usernameOrEmail && password)) {
      return res.json(
        new HttpExeption(HttpStatusEnum.BAD_REQUEST, "Empty fields")
      );
    }

    let user = await getRepository(User).findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!user) {
      return res.json(
        new HttpExeption(HttpStatusEnum.BAD_REQUEST, "User not found")
      );
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res.json(
        new HttpExeption(HttpStatusEnum.BAD_REQUEST, "Incorrect password")
      );
    }

    let userResponse: IUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const expiresIn: number = 60 * 60 * 24;
    const token = await AuthController.createToken(userResponse, expiresIn);

    return res.json(
      new HttpExeption(HttpStatusEnum.CREATED, "User Authorized", {
        token,
        user: userResponse,
      })
    );
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
    } catch (err) {
      return res.json(new HttpExeption(HttpStatusEnum.FORBIDDEN, err));
    }
    return res.json(
      new HttpExeption(HttpStatusEnum.SUCCESS_NO_CONTENT, "Created User")
    );
  };
}

export default AuthController;
