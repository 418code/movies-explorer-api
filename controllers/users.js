require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  errMsgs,
  errNames,
  errCodes,
  jwtDevKey,
  cookieMaxAge,
  httpOnlyCookieOptions,
  cookieOptions,
} = require('../utils/utils');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const BadDataError = require('../errors/BadDataError');

const { NODE_ENV, JWT_SECRET } = process.env;

// GET /users/me
module.exports.getUserInfo = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(() => new NotFoundError(errMsgs.ERR_MSG_NOT_FOUND('user')))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// PATCH /users/me — updates profile
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true }, (err, user) => {
    try {
      if (err && err.name === errNames.MONGO && err.code === errCodes.ERR_CODE_MDB_DUPLICATE) {
        throw new ConflictError(errMsgs.ERR_MSG_NOT_UPDATED('email'));
      } else if (!user) {
        throw new BadDataError(errMsgs.ERR_MSG_NOT_UPDATED('user'));
      } else {
        res.send({ data: user });
      }
    } catch (error) {
      next(error);
    }
  });
};

// POST /signup
module.exports.register = async (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  const hash = await bcrypt.hash(password, 10);
  User.create({
    email,
    password: hash,
    name,
  }, (err, usr) => {
    try {
      if (err && err.name === errNames.MONGO && err.code === errCodes.ERR_CODE_MDB_DUPLICATE) {
        throw new ConflictError(errMsgs.ERR_MSG_NOT_CREATED('user'));
      } else if (!usr) {
        throw new BadDataError(errMsgs.ERR_MSG_NOT_CREATED('user'));
      } else {
        res.send({ data: { email } });
      }
    } catch (error) {
      next(error);
    }
  });
};

// POST /signin
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : jwtDevKey, { expiresIn: '7d' });
      res
        .cookie('jwt', token, httpOnlyCookieOptions)
        .cookie('checkJWT', true, cookieOptions)
        .send({ data: {} });
    })
    .catch(next);
};

// POSt /signout
module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt');
  next();
};
