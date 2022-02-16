const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const authRouter = require('./auth');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { errMsgs } = require('../utils/utils');

router.use('/', authRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use((req, res, next) => next(new NotFoundError(errMsgs.ERR_MSG_NOT_FOUND('page'))));

module.exports = router;
