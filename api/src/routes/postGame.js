const { Router } = require('express');
const fetch = require("node-fetch");
require('dotenv').config();
const { Videogame } = require('../db.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/', (req, res)=>{
    const { name, description, release, rating, genres, platforms } = req.body
    Videogame.create({
        name,
        description,
        release,
        rating,
        genres,
        platforms,
    })
    res.status(200).send('Game created successfully.')
    
})


module.exports = router;