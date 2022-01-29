const { errCodes, errNames, errMsgs } = require('../utils/utils');

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(errMsgs.ERR_MSG_NOT_FOUND(message));
    this.statusCode = errCodes.ERR_CODE_NOT_FOUND;
    this.name = errNames.NOT_FOUND;
  }
};
