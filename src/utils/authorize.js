import jwt from "jsonwebtoken";
import { MESSAGES } from "../constants/messages.js";
import UserDetailsModel from "../models/userDetails.js";

export function authorizeUser() {
  return async (req, res, next) => {
    try {
      const apiUrl = req.originalUrl;
      const loginRoutes = ["/api/auth/login"];

      if (!loginRoutes.includes(apiUrl)) {
        let token;
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
          token = req.headers.authorization?.split(" ")[1];
        }

        if (!token) {
          return res.status(401).json({
            status: false,
            message: MESSAGES.ERROR.GLOBAL.AUTHENTICATION_FAILED,
          });
        }
        //verification of token
        jwt.verify(
          token,
          process.env.JWT_SECRET_ACCESS_TOKEN,
          (err, decoded) => {
            if (err) {
              throw new Error("Invalid Token");
            } else {
              req.auth = { userId: decoded.loginId };
            }
          }
        );
        const userData = await UserDetailsModel.findOne({
          attributes: ["login_id"],
          where: { login_id: req.auth.userId, isDeleted: 0 },
          raw: true,
        });
        if (!userData) {
          return res.status(400).json({
            status: false,
            message: MESSAGES.ERROR.GLOBAL.UNAUTHORIZED,
          });
        }
      }
      next();
    } catch (error) {
      console.log("error:", error);
      return res.status(401).json({
        status: false,
        isValidAccessToken: false,
        message: MESSAGES.ERROR.GLOBAL.INVALID_TOKEN,
      });
    }
  };
}
