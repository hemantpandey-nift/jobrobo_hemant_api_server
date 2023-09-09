import dotenv from "dotenv";
dotenv.config();
import syncModels from "./utils/sync.js";
import app from "./server.js";
import { Server } from "socket.io";

const envs = process.env;
const allowedDomains = envs?.ACCESS_ALLOWED_DOMAINS?.split("||");

syncModels();
const port = Number(process.env.PORT || 3011);

const server = app.listen(port, async () => {
  console.log("listening on port " + port);
});

export const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (allowedDomains?.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("blocked cors for:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  },
});
