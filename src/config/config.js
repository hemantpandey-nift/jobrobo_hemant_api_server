import dotenv from "dotenv";
dotenv.config();

export default {
  node_env: process.env.NODE_ENV,
  app_port: process.env.PORT,
  db: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PWD,
    dialectOptions: {
      dialect: "mysql",
      dateStrings: true,
      typeCast: true,
    },
    timezone: "+05:30", //for writing to database
  },
};
