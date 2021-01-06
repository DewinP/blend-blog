import { ConnectionOptions } from "typeorm";
export default {
  type: "postgres",
  database: "blend-blog",
  username: "postgres",
  password: "postgres",
  logging: true,
  synchronize: true,
  entities: [],
} as ConnectionOptions;
