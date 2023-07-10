const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");


Movie.belongsToMany(Genre, {through: "MoviesGenres"})
Genre.belongsToMany(Movie, {through: "MoviesGenres"})
// Movie.belongsTo(Genre)
// Genre.hasMany(Movie);

Movie.belongsToMany(Actor, {through: "MoviesActors"})
Actor.belongsToMany(Movie, {through: "MoviesActors"})

// Movie.belongsTo(Actor)
// Actor.hasMany(Movie);


Movie.belongsToMany(Director, {through: "MoviesDirectors"})
Director.belongsToMany(Movie, {through: "MoviesDirectors"})

// Movie.belongsTo(Director)
// Director.hasMany(Movie);
