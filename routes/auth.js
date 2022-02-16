const router = require('express').Router();
const {
  register,
  login,
  logout,
} = require('../controllers/users');
const { validateRegister, validateLogin } = require('../middlewares/valid');

router.post('/signup', validateRegister, register);
router.post('/signin', validateLogin, login);
router.post('/signout', logout);

module.exports = router;
