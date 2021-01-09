import argon2 from "argon2";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
class AuthController {
  static login = async (req: Request, res: Response) => {
    let { usernameOrEmail, password } = req.body;
    if (!(usernameOrEmail && password)) {
      res.status(400).send();
    }
    let user: User;
    try {
      user = await getRepository(User).findOneOrFail(
        usernameOrEmail.includes("@")
          ? { where: { email: usernameOrEmail } }
          : { where: { username: usernameOrEmail } }
      );
    } catch (error) {
      res.status(401).send();
      return;
    }

    if (!user) {
      res.status(404).send({
        errors: [
          {
            field: "usernameOrEmail",
            message: "Account doesn't exist",
          },
        ],
      });
      return;
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      res.status(401).send({
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      });
      return;
    }
  };
}

export default AuthController;
