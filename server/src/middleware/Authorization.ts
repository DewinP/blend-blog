import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

export interface TokenDataStore {
  id: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  let header = req.headers["x-access-token"] as string;
  let token = header.split(" ")[1];
  if (!token) return res.json("Not authorized");
  console.log([token]);
  let verify = jwt.verify(token, jwtSecret) as string;
  req.user_ID = verify;
  next();
};
