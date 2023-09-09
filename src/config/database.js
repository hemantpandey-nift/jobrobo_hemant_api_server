//const Sequelize = require("sequelize");
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_USER_PWD,
  logging: false,
  timezone: "+05:30", //for writing to databasea
});

export default sequelize;
