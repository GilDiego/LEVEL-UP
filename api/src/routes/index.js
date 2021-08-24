const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const games = require('./videogames.js');
const gamesParams = require('./params.js');
const genres = require('./genres.js');
const postGame = require('./postGame.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/games', games)
router.use('/games/:id', gamesParams)
router.use('/genres', genres)
router.use('/new', postGame)


module.exports = router;
