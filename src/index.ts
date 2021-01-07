import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
// import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import ormconfig from "./ORMconfig";
const PORT = 4000;

const main = async () => {
  await createConnection(ormconfig);
  const app = express();
  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.get("/", (_, res) => {
    res.json("TAP TAP TAP IN");
  });

  app.listen(PORT, () => {
    console.log(`server started in https://localhost:${PORT}`);
  });
};

main().then((e) => {
  console.log(e);
});
