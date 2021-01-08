import argon2 from "argon2";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { IUser, IUserResponse } from "../../types";
import { COOKIE_NAME } from "../constants";
import { User } from "../entity/User";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    let hashedPassword = await argon2.hash(req.body.password);
    await getRepository(User)
      .create({
        email: req.body.email,
        password: hashedPassword,
      })
      .save();

    return res.sendStatus(201);
  } catch (e) {
    next();
  }
};

export const login = async (
  req: Request,
  res: Response<IUserResponse>,
  next: NextFunction
): Promise<Response<IUserResponse> | undefined> => {
  try {
    let user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.email= :email", { email: req.body.email })
      .addSelect("user.password")
      .getOne();

    if (!user) {
      throw new Error("Wrong passowrd/or email");
    }
    const valid = await argon2.verify(user.password, req.body.password);
    if (valid) {
      req.session!._userID = user.id;
      let userRes: IUser = {
        id: user.id,
        email: user.email,
        posts: user.posts || [],
        createdAt: user.createdAt,
      };
      console.log(userRes);
      return res.status(200).send(userRes);
    } else {
      throw new Error("Wrong email");
    }
  } catch (error) {
    next(error);
  }
};

export const verifySession = async (
  req: Request,
  res: Response<User>
): Promise<Response<User>> => {
  let user = await getRepository(User).findOne({
    where: {
      id: req.session!.userId,
    },
  });
  if (user) {
    return res.send(user);
  } else {
    return res.sendStatus(100);
  }
};

export const logout = (req: Request, res: Response) => {
  if (req.session!.userId && req.cookies.COOKIE_NAME) {
    res.clearCookie(COOKIE_NAME);
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
};
