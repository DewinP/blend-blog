import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

export interface TokenDataStore {
  id: string;
  username: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  let header = req.headers["x-access-token"] as string;
  let token = header.split(" ")[1];
  if (!token) return res.json("No token");
  let verify = jwt.verify(token, jwtSecret) as TokenDataStore;
  req.user_ID = verify.id;
  next();
};
