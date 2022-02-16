const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateCreateMovie,
  validateFilmId,
} = require('../middlewares/valid');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:filmId', validateFilmId, deleteMovie);

module.exports = router;
