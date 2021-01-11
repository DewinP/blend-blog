import argon2 from "argon2";
import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { HttpStatusEnum, IFieldError, IUser, IUserInput } from "../types";
import { User } from "../entity/User";
import { jwtSecret } from "../config";
import * as jwt from "jsonwebtoken";
import { validateRegister } from "../utils/validateRegister";
import { resolve } from "path";

interface IAuthResponse {
  errors?: IFieldError[];
  user?: IUserAuth;
}
interface IUserAuth {
  token: string;
  userID: string;
  username: string;
}

class AuthController {
  static createToken = async (
    user: IUser,
    expiresIn: number
  ): Promise<string> => {
    const secret: string = jwtSecret;
    const token = jwt.sign(user, secret, { expiresIn });
    return token;
  };

  static login = async (
    req: Request,
    res: Response
  ): Promise<Response<IAuthResponse>> => {
    let { username, password } = req.body;
    let user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.username = :username", { username: username })
      .addSelect("user.password")
      .getOne();
    console.log(user);
    if (!user) {
      return res.json({
        errors: [
          {
            field: "username",
            message: "Username doesn't exist",
            status: HttpStatusEnum.BAD_REQUEST,
          },
        ],
      });
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res.json({
        errors: [
          {
            field: "password",
            message: "Incorrect password. Try again",
          },
        ],
      });
    }

    let userResponse: IUser = {
      id: user.id,
      username: user.username,
    };
    const expiresIn: number = 60 * 60 * 24;
    const token = await AuthController.createToken(userResponse, expiresIn);
    return res.json({
      user: { token, userID: user.id, username: user.username },
    });
  };

  static register = async (
    req: Request,
    res: Response
  ): Promise<Response<IFieldError[] | HttpStatusEnum>> => {
    let { email, password, username } = req.body;
    let userInput: IUserInput = {
      email: email,
      username: username,
      password: password,
    };
    const errors = validateRegister(userInput);
    if (errors) return res.json({ errors });

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
      if (error.code === "23505") {
        if (error.detail.includes("email")) {
          return res.json({
            errors: [
              {
                field: "email",
                message: "email is already being used",
              },
            ],
          });
        } else {
          return res.json({
            errors: [
              {
                field: "username",
                message: "username already taken",
              },
            ],
          });
        }
      }
    }
    return res.sendStatus(HttpStatusEnum.SUCCESS);
  };
}

export default AuthController;
