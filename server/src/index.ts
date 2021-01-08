import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import bodyParser from "body-parser";
import ormconfig from "./ORMconfig";
import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";
import userRoutes from "./routes/user.routes";
import errorMiddleware from "./middleware/error.middleware";
const PORT = 4000;

const main = async () => {
  await createConnection(ormconfig);
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
        cookie: {
          path: "/",
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
          secure: true,
        },
        secret: "blending in",
        resave: false,
        saveUninitialized: true,
      })
    )
    .use(errorMiddleware);
  app.set("trust proxy", 1);

  app.get("/", (_, res) => {
    res.json("TAP TAP TAP IN");
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/users", userRoutes);

  app.listen(PORT, () => {
    console.log(`server started in https://localhost:${PORT}`);
  });
};

main().then((e) => {
  console.log(e);
});
