import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";
import { IUser } from "../types";

const createToken = (user: IUser) => {
  try {
    jwt.sign({ user }, jwtSecret);
  } catch (error) {
    return { error: error };
  }
};

export default createToken;
