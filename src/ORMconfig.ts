import { ConnectionOptions } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
export default {
  type: "postgres",
  database: "blend-blog",
  username: "postgres",
  password: "postgres",
  logging: true,
  synchronize: true,
  entities: [Post, User],
} as ConnectionOptions;
