import CustomError from "./custom-error.js";

function errorHandler(error, request, response, next) {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";

  if (error instanceof CustomError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  return response
    .status(statusCode)
    .json({ error: message, statusCode: statusCode });
}

export default errorHandler;
