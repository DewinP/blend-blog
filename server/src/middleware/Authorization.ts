import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";
import { HttpStatusEnum } from "../types";

export interface TokenDataStore {
  id: string;
  username: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(HttpStatusEnum.UNAUTHORIZED).json("Not authorized");

  let verify = jwt.verify(token, jwtSecret) as TokenDataStore;
  console.log(verify);
  req.user_ID = verify.id;
  next();
};
