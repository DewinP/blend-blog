import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
// import cors from "cors";
import ormconfig from "./ORMconfig";
const PORT = 4000;

const main = async () => {
  const connection = await createConnection(ormconfig);
  const app = express();

  app.use(express.json());

  app.listen(PORT, () => {
    console.log(`server started in https://localhost:${PORT}`);
  });
};

main().then((e) => {
  console.log(e);
});
