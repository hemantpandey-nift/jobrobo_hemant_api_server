import _ from "lodash";

const envs = process.env;
const allowedDomains = envs?.ACCESS_ALLOWED_DOMAINS?.split("||");

export const origin = [...allowedDomains];
export const CorsOptions = {
  credentials: true,
  maxAge: 60 * 60 * 24,
  exposedHeaders: [
    "Cache-Control",
    "Content-Language",
    "Content-Type",
    "Expires",
    "Last-Modified",
    "Pragma",
  ],
  allowedHeaders: ["Content-Type", "Origin", "Authorization"],
  methods: ["OPTIONS", "POST", "GET", "PUT", "PATCH", "DELETE"],
  origin: _.map(origin, (whiteUrl) => {
    const regex = new RegExp(whiteUrl);

    return regex;
  }),
  optionsSuccessStatus: 200,
};
