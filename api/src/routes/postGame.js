const { Router } = require('express');
const router = Router();
const { Videogame, Genre } = require('../db');


router.post('/', async (req, res) => {
    let { name, description, release, rating, genres, platforms } = req.body;
    let genreDt = genres.map(gen => {
        return Genre.findOrCreate({
            where: {
                name: gen
            }
        })
    });

    let allGenres = await Promise.all(genreDt);
    let videogame = await Videogame.create({
        name,
        description,
        release,
        rating: Number(rating),
        platforms,
    })
    allGenres.forEach(gen => videogame.setGenres(gen[0]));
    res.json(videogame);

})

module.exports = router

