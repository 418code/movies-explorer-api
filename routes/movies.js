const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
// const {
//   validateAddMovie,
//   validateMovieId,
// } = require('../middlewares/valid');

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:filmId', deleteMovie);

module.exports = router;
