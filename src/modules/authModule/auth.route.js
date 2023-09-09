import { Router } from "express";
import * as userAuthController from "./auth.controller.js";

const authRoute = Router();

authRoute.get("/login", (req, res) => {
  userAuthController.userLogin(req, res);
});

export default authRoute;
