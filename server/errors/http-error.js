const { constants } = require("../utils/constants");

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.title = this.getErrorTitle(statusCode);
    Error.captureStackTrace(this, this.constructor);
  }

  getErrorTitle(statusCode) {
    return (
      Object.keys(constants).find((key) => constants[key] === statusCode) ||
      "ERROR : Defect"
    );
  }

  static badRequest(msg) {
    return new HttpError(msg, constants.VALIDATION_ERROR);
  }

  static unauthorized(msg) {
    return new HttpError(msg, constants.UNAUTHORIZED);
  }

  static forbidden(msg) {
    return new HttpError(msg, constants.FORBIDDEN);
  }

  static notFound(msg) {
    return new HttpError(msg, constants.NOT_FOUND);
  }

  static serverError(msg) {
    return new HttpError(msg, constants.SERVER_ERROR);
  }
}

module.exports = HttpError;
