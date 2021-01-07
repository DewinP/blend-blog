import argon2 from "argon2";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { COOKIE_NAME } from "../constants";
import { User } from "../entity/User";

export const signup = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let hashedPassword = await argon2.hash(req.body.password);
    let user = await getRepository(User)
      .create({
        email: req.body.email,
        password: hashedPassword,
      })
      .save();

    req.session!.userId = user.id;

    return res.send({
      email: user.email,
      id: user.id,
    });
  } catch (e) {
    return res.sendStatus(500).send({ "error MSG:": e });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    let user = await getRepository(User).findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.send("Incorrect email or password");
    const valid = await argon2.verify(user.password, req.body.password);
    return valid
      ? res.send(user)
      : res.sendStatus(404).send("Incorrect password");
  } catch (e) {
    return res.sendStatus(500).send(e);
  }
};

export const verifySession = async (
  req: Request,
  res: Response
): Promise<Response | null> => {
  if (!req.session!.userId) {
    return res.send(null);
  }
  let user = await getRepository(User).findOne({
    where: {
      id: req.session!.userId,
    },
  });
  return res.send(user);
};

export const logout = (req: Request, res: Response) => {
  if (req.session!.userId && req.cookies.COOKIE_NAME) {
    res.clearCookie(COOKIE_NAME);
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
};
