module.exports.errMsgs = {
  ERR_MSG_DEFAULT: 'A server error happened',
  ERR_MSG_LOGIN: 'Wrong email or password',
  ERR_MSG_AUTH_REQ: 'Authentication required',
  ERR_MSG_FORBIDDEN: 'Not authorized',
  ERR_MSG_BAD_DATA: (name) => `Bad ${name} data`,
  ERR_MSG_NOT_FOUND: (name) => `Requested ${name} not found`,
  ERR_MSG_NOT_CREATED: (name) => `Requested ${name} not created`,
  ERR_MSG_NOT_UPDATED: (name) => `Requested ${name} not updated`,
};

module.exports.errNames = {
  VALIDATION: 'ValidationError',
  CAST: 'CastError',
  CONFLICT: 'ConflictError',
  NOT_FOUND: 'DocumentNotFoundError',
  NOT_AUTH: 'AuthenticationError',
  FORBIDDEN: 'ForbiddenError',
  MONGO: 'MongoServerError',
};

module.exports.errCodes = {
  ERR_CODE_BAD_DATA: 400,
  ERR_CODE_NOT_AUTH: 401,
  ERR_CODE_FORBIDDEN: 403,
  ERR_CODE_NOT_FOUND: 404,
  ERR_CODE_CONFLICT: 409,
  ERR_CODE_DEFAULT: 500,
  ERR_CODE_MDB_DUPLICATE: 11000,
};

module.exports.errors = {
  [this.errNames.VALIDATION]: this.errCodes.ERR_CODE_BAD_DATA,
  [this.errNames.CAST]: this.errCodes.ERR_CODE_BAD_DATA,
  [this.errNames.NOT_FOUND]: this.errCodes.ERR_CODE_NOT_FOUND,
  [this.errNames.NOT_AUTH]: this.errCodes.ERR_CODE_NOT_AUTH,
  [this.errNames.FORBIDDEN]: this.errCodes.ERR_CODE_FORBIDDEN,
  [this.errNames.CONFLICT]: this.errCodes.ERR_CODE_CONFLICT,
};

module.exports.sendErrRes = (res, errCode, errMsg) => {
  res.status(errCode).send({ error: { message: errMsg } });
};

module.exports.urlRegEx = /https?:\/\/(www\.)?[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]+/;

module.exports.jwtDevKey = 'aa261cbe7d74fd2d3766c625d186fa075759a4e267b4ea8413f8f68697082921';

module.exports.cookieMaxAge = 7 * 24 * 60 * 60; // time in seconds

module.exports.limiterValues = {
  windowMs: 10 * 60 * 1000, // 10 min
  max: 100, // limit each IP to 100 requests per windowMs
};
