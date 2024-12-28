const HttpError = require("../errors/http-error");
const { constants } = require("../utils/constants");

const errorHandler = (err, req, res, next) => {
  // handle our custom HttpError
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      title: err.title,
      message: err.message,
      stackTrace: err.stack,
    });
  }

  // handle regular errors with status codes already set
  const statusCode = res.statusCode ?? 500;
  const errorTitle =
    Object.keys(constants).find((key) => constants[key] === statusCode) ||
    "ERROR : Defect";

  res.status(statusCode).json({
    title: errorTitle,
    message: err.message,
    stackTrace: err.stack,
  });
};

module.exports = errorHandler;
