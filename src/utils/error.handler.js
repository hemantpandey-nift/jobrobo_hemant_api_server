import { isCelebrateError } from "celebrate";

export const celebrateError = () => {
  return (err, req, res, next) => {
    if (!isCelebrateError(err)) {
      return next(err);
    }

    let message = "";

    for (const [segment, joiError] of err.details.entries()) {
      message = joiError.details.map((detail) => detail.message).join(".");
    }

    return res.status(400).json({
      status: false,
      message: message,
    });
  };
};
