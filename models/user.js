const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { errMsgs } = require('../utils/utils');
const BadDataError = require('../errors/BadDataError');
const NotAuthError = require('../errors/NotAuthError');

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
  locale: {
    type: String,
    required: true,
    default: 'en-us',
    minlength: 5,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  const loginError = new NotAuthError(errMsgs.ERR_MSG_LOGIN);
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw loginError;
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw loginError;
  }

  return user;
};

module.exports = mongoose.model('user', userSchema);
