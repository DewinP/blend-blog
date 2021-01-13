import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import bodyParser from "body-parser";
import { ORMConfig, PORT } from "./config";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";

const main = async () => {
  await createConnection(ORMConfig);
  const app = express()
    .use(morgan("dev"))
    .use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    )
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(
      session({
        secret: "cat",
        resave: false,
        saveUninitialized: true,
      })
    );

  app.use("/api/auth", authRoutes);
  app.use("/api/posts", postRoutes);

  app.listen(PORT, () => {
    console.log(`server started in https://localhost:${PORT}`);
  });
};

main().then((e) => {
  console.log(e);
});
