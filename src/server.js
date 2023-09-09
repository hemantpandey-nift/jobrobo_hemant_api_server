import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
import { celebrateError } from "./utils/error.handler.js";
import { authorizeUser } from "./utils/authorize.js";
import errorHandler from "./error-handler/errorMiddleware.js";

const envs = process.env;
const allowedDomains = envs?.ACCESS_ALLOWED_DOMAINS?.split("||");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("origin:", origin);
      if (!origin || allowedDomains?.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("blocked cors for:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })
);

if (process.env.AUTHENTICATE === "yes") {
  app.use(authorizeUser());
}

app.use("/api", router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(celebrateError());
// Print API errors
// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.use(errorHandler);

process.on("uncaughtException", function (err) {
  // Handle the error safely
  console.log(err);
});

// Export express instance
export default app;
