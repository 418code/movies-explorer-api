const { celebrate, Joi, Segments } = require('celebrate');
const { urlRegEx } = require('../utils/utils');

module.exports.validateUpdateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validateRegister = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateCreateMovie = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required().min(2).max(128),
    director: Joi.string().required().min(2).max(1024),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegEx),
    trailer: Joi.string().required().regex(urlRegEx),
    thumbnail: Joi.string().required().regex(urlRegEx),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2).max(1024),
    nameEN: Joi.string().required().min(2).max(1024),
  }),
});

module.exports.validateFilmId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    filmId: Joi.string().required().hex().length(24),
  }),
});
