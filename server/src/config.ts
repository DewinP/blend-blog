import { ConnectionOptions } from "typeorm";
import { Post } from "./entity/Post";
import { User } from "./entity/User";

export const ORMConfig = {
  type: "postgres",
  database: "blend-blog",
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASS || "postgres",
  logging: true,
  synchronize: true,
  entities: [Post, User],
} as ConnectionOptions;
export const PORT = process.env.PORT || 4000;
export const jwtSecret = process.env.JWT_SECRET || "TOKEN_SECRET";
