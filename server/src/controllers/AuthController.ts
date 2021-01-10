import argon2 from "argon2";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { IUserInput } from "../../types";
import { User } from "../entity/User";
import createToken from "../utils/CreateToken";
import { validateRegister } from "../utils/ValidateRegister";
class AuthController {
  static login = async (req: Request, res: Response) => {
    let { usernameOrEmail, password } = req.body;
    if (!(usernameOrEmail && password)) {
      res.status(400).json("No empty fields");
    }
    let user;
    try {
      user = await getRepository(User).findOneOrFail(
        usernameOrEmail.includes("@")
          ? { where: { email: usernameOrEmail } }
          : { where: { username: usernameOrEmail } }
      );
    } catch (error) {
      return res.status(401).json("user does not exist");
    }

    if (!user) {
      return res.status(404).json({
        errors: [
          {
            field: "usernameOrEmail",
            message: "Account doesn't exist",
          },
        ],
      });
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res.status(401).json({
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      });
    }

    return res.status(201).json({ token: createToken(user.id) });
  };

  static register = async (req: Request, res: Response) => {
    let { email, password, username } = req.body;
    let user: IUserInput = {
      email: email,
      username: username,
      password: password,
    };

    const errors = validateRegister(user);
    if (errors) {
      return res.status(400).json({ errors });
    }

    const hashedPass = await argon2.hash(user.password);
    user.password = hashedPass;
    try {
      await getRepository(User).create(user).save();
    } catch (err) {
      return res.status(409).json("already in use");
    }

    return res.json("user created");
  };
}

export default AuthController;
