import argon2 from "argon2";
import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { HttpStatusEnum, IFieldError, IUser, IUserInput } from "../types";
import { User } from "../entity/User";
import { jwtSecret } from "../config";
import * as jwt from "jsonwebtoken";

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
  ): Promise<IAuthResponse> => {
    let { username, password } = req.body;
    let user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.username = :username", { username: username })
      .addSelect("user.password")
      .getOne();

    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "Username already taken",
            status: HttpStatusEnum.BAD_REQUEST,
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password. Try again",
            status: HttpStatusEnum.BAD_REQUEST,
          },
        ],
      };
    }

    let userResponse: IUser = {
      id: user.id,
      username: user.username,
    };
    const expiresIn: number = 60 * 60 * 24;
    const token = await AuthController.createToken(userResponse, expiresIn);
    return { user: { token, userID: user.id, username: user.username } };
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
      return res.json({
        error: {
          status: HttpStatusEnum.SERVER_ERROR,
          message: "Internal server error",
        },
      });
    }
    return res.status(HttpStatusEnum.SUCCESS_NO_CONTENT).json("User created");
  };
}

export default AuthController;
