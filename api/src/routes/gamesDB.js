const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');

const router = Router();


router.get('/', async (req, res) => {
    let videogamesDb = await Videogame.findAll({
        include: Genre
    });
    //Parses object
    videogamesDb = JSON.stringify(videogamesDb);
    videogamesDb = JSON.parse(videogamesDb);
    //Converts genres
    videogamesDb = videogamesDb.reduce((acc, el) => acc.concat({
        ...el,
        genres: el.genres.map(g => g.name)
    }), [])

    res.json(videogamesDb)
})

module.exports = router;
