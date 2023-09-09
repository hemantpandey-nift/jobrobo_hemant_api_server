import sequelize from "../config/database.js";
import { Op } from "sequelize";

const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to mysql db");
  } catch (err) {
    console.log("Connection to DB failed:", err);
  }
};

export default syncModels;
