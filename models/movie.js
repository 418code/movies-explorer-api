const mongoose = require('mongoose');
const { urlRegEx } = require('../utils/utils');

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
    match: urlRegEx,
  },
  trailer: {
    type: String,
    required: true,
    match: urlRegEx,
  },
  thumbnail: {
    type: String,
    required: true,
    match: urlRegEx,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
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
