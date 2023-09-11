import dotenv from "dotenv";
dotenv.config();
import syncModels from "./utils/sync.js";
import app from "./server.js";

const envs = process.env;
const allowedDomains = envs?.ACCESS_ALLOWED_DOMAINS?.split("||");

syncModels();
const port = Number(process.env.PORT || 3011);

const server = app.listen(port, async () => {
  console.log("listening on port " + port);
});
