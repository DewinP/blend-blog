import { Session } from "../../../types";
import "express-session";

declare module "express-session" {
  interface SessionData {
    user_ID: string;
  }
}
