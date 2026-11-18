const { Router } = require('express');
const rawg = require('../services/rawg');
const store = require('../services/videogames');
const { Genre } = require('../db');

const router = Router();

const handle = (action) => (req, res, next) => action(req, res).catch(next);

router.get(
  '/games',
  handle(async (req, res) => {
    const { name, page = 1 } = req.query;

    if (name) return res.json(await rawg.searchGames(name));

    const stored = await store.listStored();
    const pageSize = Number(page) === 1 ? rawg.PAGE_SIZE - stored.length : rawg.PAGE_SIZE;

    res.json(await rawg.listGames({ page, pageSize }));
  })
);

router.get(
  '/games/:id',
  handle(async (req, res) => {
    res.json(await rawg.getGame(req.params.id));
  })
);

router.get(
  '/genres',
  handle(async (req, res) => {
    const genres = await Genre.findAll({ attributes: ['name'] });

    if (genres.length) return res.json(genres);

    res.json(await store.syncGenres(await rawg.listGenres()));
  })
);

router.get(
  '/gamesDB',
  handle(async (req, res) => {
    res.json(await store.listStored());
  })
);

router.post(
  '/new',
  handle(async (req, res) => {
    res.json(await store.createStored(req.body));
  })
);

module.exports = router;
