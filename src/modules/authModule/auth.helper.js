import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const comparePassword = async (newpassword, oldpassword) => {
   // const comparedPassword = await bcrypt.compareSync(newpassword, oldpassword);
  return newpassword === oldpassword;
};

export const generateAccessToken = (data) => {
  const tokenData = {
    loginId: data.loginId,
    user_name: data.user_name,
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
