import "reflect-metadata";
import "dotenv/config";
import "services/common/register";
import { configureDatabase } from "services/common/helpers/configureDatabase";
import { app } from "./app";

async function start() {
  await configureDatabase();
  app.listen(3000, () => console.log("Listening on port 3000"));
}

start();
