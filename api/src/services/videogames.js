const { Videogame, Genre } = require('../db');

const withGenreNames = (videogame) => ({
  ...videogame.toJSON(),
  genres: videogame.genres.map((genre) => genre.name),
});

const listStored = async () => {
  const videogames = await Videogame.findAll({ include: Genre });
  return videogames.map(withGenreNames);
};

const createStored = async ({ name, description, release, rating, genres = [], platforms }) => {
  const videogame = await Videogame.create({
    name,
    description,
    release,
    rating: Number(rating),
    platforms,
  });

  const stored = await Promise.all(
    genres.map((genre) => Genre.findOrCreate({ where: { name: genre } }))
  );
  await videogame.setGenres(stored.map(([genre]) => genre));

  return videogame;
};

const syncGenres = async (names) => {
  await Genre.bulkCreate(names.map((name) => ({ name })));
  return Genre.findAll({ attributes: ['name'] });
};

module.exports = { withGenreNames, listStored, createStored, syncGenres };
