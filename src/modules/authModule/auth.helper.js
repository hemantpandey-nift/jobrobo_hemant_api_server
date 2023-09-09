import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const comparePassword = async (newpassword, oldpassword) => {
  const comparedPassword = await bcrypt.compareSync(newpassword, oldpassword);
  return comparedPassword;
};

export const generateRefreshToken = (data) => {
  const tokenData = {
    id: data.loginId,
  };
  const token = signedRefreshToken(tokenData);
  return token;
};

export const signedRefreshToken = (data) => {
  const tokenData = {
    ...data,
    iss: "ams",
    token_use: "refresh",
    auth_time: Date.now(),
  };

  return jwt.sign(tokenData, process.env.JWT_SECRET_REFRESH_TOKEN, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};

export const generateAccessToken = (data) => {
  const tokenData = {
    loginId: data.loginId,
  };
  const token = signedAccessToken(tokenData);
  return token;
};

const signedAccessToken = (data) => {
  const tokenData = {
    ...data,
    iss: "hemant_assessment",
    token_use: "access",
    auth_time: Date.now(),
  };
  return jwt.sign(tokenData, process.env.JWT_SECRET_ACCESS_TOKEN, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
};
