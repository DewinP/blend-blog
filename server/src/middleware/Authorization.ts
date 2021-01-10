import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../config";
import { HttpStatusEnum } from "../types";
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const getToken: any = req.headers["Authorization"];
  const verfiy = jwt.verify(getToken, jwtSecret);
  if (verfiy) {
    next();
  }
  res.status(HttpStatusEnum.UNAUTHORIZED).json("Not authorized");
};
