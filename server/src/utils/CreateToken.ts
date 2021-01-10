import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

const createToken = (userID: number) => {
  return jwt.sign({ userID }, jwtSecret);
};

export default createToken;
