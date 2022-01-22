const router = require('express').Router();
const userRouter = require('./users');
const NotFoundError = require('../errors/NotFoundError');
const { errMsgs } = require('../utils/utils');

router.use('/users', userRouter);
router.use((req, res, next) => next(new NotFoundError(errMsgs.ERR_MSG_NOT_FOUND('page'))));

module.exports = router;
