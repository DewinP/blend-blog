import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

const createToken = (userID: string) => {
  try {
    jwt.sign(userID, jwtSecret);
  } catch (error) {
    return { error: error };
  }
};

export default createToken;
