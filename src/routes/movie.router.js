const { getAll, create, getOne, remove, update,movieGenres, movieActors, movieDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/genres')
    .post(movieGenres)

movieRouter.route('/:id/actors')
    .post(movieActors)

movieRouter.route('/:id/directors')
    .post(movieDirectors)

module.exports = movieRouter;