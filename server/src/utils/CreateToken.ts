import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

const createToken = (userID: string) => {
  return jwt.sign({ user_ID: userID }, jwtSecret);
};

export default createToken;
