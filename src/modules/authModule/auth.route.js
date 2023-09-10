import { Router } from "express";
import * as userAuthController from "./auth.controller.js";
import * as authSchema from "./auth.schema.js";

const authRoute = Router();

authRoute.post("/login", authSchema.loginSchema, (req, res) => {
  userAuthController.userLogin(req, res);
});

export default authRoute;
