import argon2 from "argon2";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { HttpStatusEnum, IUser, IUserInput, TokenDataStore } from "../types";
import { User } from "../entity/User";
import { HttpExeption } from "../exception/HttpExeption";
import { validateRegister } from "../utils/ValidateRegister";
import { jwtSecret } from "../config";
import * as jwt from "jsonwebtoken";

class AuthController {
  static createToken = async (
    user: TokenDataStore,
    expiresIn: number
  ): Promise<string> => {
    const secret: string = jwtSecret;
    const token = jwt.sign(user, secret, { expiresIn });
    console.log("TOKENNNN", token);
    return token;
  };

  static login = async (
    req: Request,
    res: Response
  ): Promise<HttpExeption | Object> => {
    let { usernameOrEmail, password } = req.body;
    if (!(usernameOrEmail && password)) {
      return new HttpExeption(HttpStatusEnum.BAD_REQUEST, "Empty fields");
    }
    let user;
    try {
      user = await getRepository(User).findOneOrFail(
        usernameOrEmail.includes("@")
          ? { where: { email: usernameOrEmail } }
          : { where: { username: usernameOrEmail } }
      );
    } catch (error) {
      return new HttpExeption(
        HttpStatusEnum.SERVER_ERROR,
        "Internal server error"
      );
    }
    if (!user) {
      return new HttpExeption(HttpStatusEnum.NOT_FOUND, "User doesnt exist");
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return new HttpExeption(HttpStatusEnum.BAD_REQUEST, "Incorrect password");
    }

    let userResponse: IUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const expiresIn: number = 60 * 60 * 24;
    const token = await AuthController.createToken(userResponse, expiresIn);
    console.log("token 123455325235: ");

    return res.status(201).json({ token, user: userResponse });
  };

  static register = async (req: Request) => {
    let { email, password, username } = req.body;
    let user: IUserInput = {
      email: email,
      username: username,
      password: password,
    };

    const error = validateRegister(user);
    if (error) {
      return new HttpExeption(HttpStatusEnum.BAD_REQUEST, error);
    }

    const hashedPass = await argon2.hash(user.password);
    user.password = hashedPass;
    try {
      await getRepository(User).create(user).save();
    } catch (err) {
      return new HttpExeption(HttpStatusEnum.FORBIDDEN, "Already taken");
    }
    return new HttpExeption(HttpStatusEnum.SUCCESS_NO_CONTENT, "Created User");
  };
}

export default AuthController;
