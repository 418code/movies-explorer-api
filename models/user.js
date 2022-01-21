const mongoose = require('mongoose');
const validator = require('validator');
const { errMsgs } = require('../utils/utils');
const BadDataError = require('../errors/BadDataError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Ktulchu',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new BadDataError(errMsgs.ERR_MSG_BAD_DATA('email'));
      }
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

module.exports = mongoose.model('user', userSchema);
