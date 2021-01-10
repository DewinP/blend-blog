import { ConnectionOptions } from "typeorm";
import { Post } from "./entity/Post";
import { User } from "./entity/User";

export const ORMConfig = {
  type: "postgres",
  database: "blend-blog",
  username: "postgres",
  password: "postgres",
  logging: true,
  synchronize: true,
  entities: [Post, User],
} as ConnectionOptions;

export const jwtSecret = "TokenPasswordSecret";
