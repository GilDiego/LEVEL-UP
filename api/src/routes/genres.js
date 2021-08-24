const { Router } = require('express');
const fetch = require("node-fetch");
require('dotenv').config();
const { API_KEY } = process.env;
const { Genre } = require('../db.js');

const router = Router();

function filterGenres(data){
    console.log(data)
    let genres = data.results.map(genre => genre.name)
    genres.forEach(value => Genre.create({name: value}))
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res)=>{

    const genre = await Genre.findAll({ attributes: ['name'] })
    if (genre.length === 0) {  
    fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then(data => data.json())
    .then(data => filterGenres(data))
    .catch(e => console.log(e))
    
    const response = await Genre.findAll({ attributes: ['name'] })
    res.status(200).json(response)
    } 
    else res.status(200).json(genre)

})


module.exports = router;