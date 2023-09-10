import { MESSAGES } from "../../constants/index.js";
import UserDetailsModel from "../../models/userDetails.js";
import { comparePassword, generateAccessToken } from "./auth.helper.js";

export const userLogin = async (req, res) => {
  try {
    const { loginId, loginPassword } = req.body;
    if (!loginId || !loginPassword) {
      return res.status(400).json({
        status: false,
        message: MESSAGES.ERROR.GLOBAL.LOGIN,
      });
    }
    const userData = await UserDetailsModel.findOne({
      attributes: ["login_id", "login_password", "user_name"],
      where: { login_id: loginId, isDeleted: 0 },
      raw: true,
    });

    if (!userData) {
      return res.status(400).json({
        status: false,
        message: MESSAGES.ERROR.GLOBAL.LOGIN,
      });
    }

    const isPassword = process.env.PASSWORD;
    if (isPassword === "true") {
      let userPassword = userData?.login_password;

      let passwordCompared = await comparePassword(loginPassword, userPassword);
      if (!passwordCompared) {
        return res.status(400).json({
          status: false,
          message: "Invalid Email Id or Password !!! ",
        });
      }
    }

    const generatedAccessTokenData = generateAccessToken({
      loginId,
      user_name: userData.user_name,
    });

    await UserDetailsModel.update(
      { last_logged_at: new Date() },
      {
        where: { login_id: loginId },
      }
    );
    return res.status(200).json({
      status: true,
      message: MESSAGES.SUCCESS.GLOBAL.LOGIN,
      data: {
        user: loginId,
      },
      token: {
        accessToken: generatedAccessTokenData,
      },
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(400).json({
      status: false,
      message: MESSAGES.ERROR.GLOBAL.LOGIN,
    });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({
        status: false,
        isValidRefreshToken: false,
        message: MESSAGES.ERROR.GLOBAL.SESSION_EXPIRE,
      });
    }
    jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_REFRESH_TOKEN,
      (err, decoded) => {
        if (err) {
          throw new Error(MESSAGES.ERROR.GLOBAL.SESSION_EXPIRE);
        } else {
          req.auth = { loginId: decoded.id };
        }
      }
    );
    let loginId = req?.auth?.loginId;
    const isDbRefreshToken = await UserLogDataModel.findOne({
      attributes: ["refresh_token"],
      where: { login_id: loginId },
      raw: true,
    });
    if (!isDbRefreshToken) {
      return res.status(400).json({
        status: false,
        isValidRefreshToken: false,
        message: MESSAGES.ERROR.GLOBAL.SESSION_EXPIRE,
      });
    }
    if (!isDbRefreshToken?.refresh_token == refreshToken) {
      return res.status(400).json({
        status: false,
        isValidRefreshToken: false,
        message: MESSAGES.ERROR.GLOBAL.SESSION_EXPIRE,
      });
    }
    const userEmployeeData = await EmployeeModel.findOne({
      attributes: ["EmployeeId", "employee_name", "gender"],
      where: { user_id: loginId, status: "Active" },
      raw: true,
    });

    const employeeId = userEmployeeData?.EmployeeId ?? "";
    const employeeName = userEmployeeData?.employee_name ?? loginId;
    const gender = userEmployeeData?.gender ?? null;
    const currentWorkMode = await UserDetailsModel.findOne({
      attributes: ["workMode"],
      where: {
        employeeId: employeeId,
        isActive: 1,
      },
      raw: true,
    });

    const employeeWorkMode = currentWorkMode?.workMode ?? "";

    let userRolesData = await getUserRoles(loginId);
    const generatedAccessTokenData = generateAccessToken({
      loginId,
      employeeId,
      employeeName,
      gender,
      employeeWorkMode,
      userRolesData,
    });
    return res.status(200).json({
      status: true,
      isValidRefreshToken: true,
      message: MESSAGES.SUCCESS.GLOBAL.LOGIN,
      data: {
        user: loginId,
      },
      token: {
        accessToken: generatedAccessTokenData,
      },
    });
  } catch (err) {
    logger.error(err);
    return res.status(400).json({
      status: false,
      isValidRefreshToken: false,
      message: MESSAGES.ERROR.GLOBAL.LOGIN,
    });
  }
};
