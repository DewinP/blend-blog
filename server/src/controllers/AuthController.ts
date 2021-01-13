import argon2 from "argon2";
import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { IFieldError, IUser, IUserInput } from "../types";
import { User } from "../entity/User";
import { jwtSecret } from "../config";
import * as jwt from "jsonwebtoken";
import { validateInput } from "../utils/validateInput";

interface ILoginResponse {
  token?: string;
  user?: IUser;
  errors?: IFieldError[];
}

class AuthController {
  static userAuthenticated = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :id", { id: req.user_ID })
      .leftJoinAndSelect("user.posts", "posts")
      .getOne();

    if (user) {
      return res.json({ user: user });
    }
    return res.json(null);
  };

  static createToken = async (userID: string): Promise<string> => {
    const secret: string = jwtSecret;
    const token = jwt.sign(userID, secret);
    return token;
  };

  static login = async (
    req: Request,
    res: Response
  ): Promise<Response<ILoginResponse>> => {
    let errors = validateInput(req.body);
    if (errors) {
      return res.json({ errors });
    }

    let { username, password } = req.body;
    let user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.username = :username", { username: username })
      .leftJoinAndSelect("user.posts", "posts")
      .addSelect("user.password")
      .getOne();

    if (!user) {
      return res.json({
        errors: [
          {
            field: "username",
            message: "Username doesn't exist",
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
    const token = await AuthController.createToken(user.id);
    let formattedUser: IUser = {
      id: user.id,
      username: user.username,
      email: user.username,
      createdAt: user.createdAt,
      posts: user.posts,
    };
    return res.json({
      token,
      user: formattedUser,
    });
  };

  static register = async (
    req: Request,
    res: Response
  ): Promise<Response<IFieldError[]>> => {
    let { email, password, username } = req.body;
    let userInput: IUserInput = {
      email: email,
      username: username,
      password: password,
    };
    const errors = validateInput(userInput);
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
    return res.sendStatus(200);
  };
}

export default AuthController;
