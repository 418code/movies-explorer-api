const User = require('../models/user');
const {
  errMsgs,
} = require('../utils/utils');
const NotFoundError = require('../errors/NotFoundError');

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

  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .orFail(() => NotFoundError(errMsgs.ERR_MSG_NOT_FOUND('user')))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};
