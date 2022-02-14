const mongoose = require('mongoose');
const validator = require('validator');
const { errMsgs } = require('../utils/utils');
const BadDataError = require('../errors/BadDataError');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 128,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new BadDataError(errMsgs.ERR_MSG_BAD_DATA('image'));
      }
    },
  },
  trailer: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new BadDataError(errMsgs.ERR_MSG_BAD_DATA('trailer'));
      }
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new BadDataError(errMsgs.ERR_MSG_BAD_DATA('thumbnail'));
      }
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
});

module.exports = mongoose.model('movie', movieSchema);
