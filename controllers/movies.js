const Movie = require('../models/movie');
const BadDataError = require('../errors/BadDataError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  errMsgs,
} = require('../utils/utils');

// GET /movies — returns all movies
module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .orFail(() => new NotFoundError(errMsgs.ERR_MSG_NOT_FOUND('movies')))
    .then((movies) => res.send(movies))
    .catch(next);
};

// POST /movies — creates a movie
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: _id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      if (!movie) {
        throw new BadDataError(errMsgs.ERR_MSG_NOT_CREATED('movie'));
      } else {
        res.send(movie);
      }
    })
    .catch(next);
};

// DELETE /movies/:filmId — deletes a movie with filmId
module.exports.deleteMovie = (req, res, next) => {
  const { filmId } = req.params;
  const { _id } = req.user;

  Movie.findById(filmId)
    .orFail(() => new NotFoundError(errMsgs.ERR_MSG_NOT_FOUND('movie')))
    .then((movie) => {
      if (movie.owner._id.toString() !== _id) {
        throw new ForbiddenError();
      } else {
        return Movie.deleteOne(movie)
          .orFail(() => new NotFoundError(errMsgs.ERR_MSG_NOT_FOUND('movie')))
          .then(() => { res.send({ data: {} }); });
      }
    })
    .catch(next);
};
