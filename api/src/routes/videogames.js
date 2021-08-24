const { Router } = require('express');
const fetch = require("node-fetch");
require('dotenv').config();
const { API_KEY } = process.env;

const router = Router();


function fetchGames(data){
    let array = []
    if (array.length < 15){
        array.push(data.results.map(game => (
            {
                id : game.id,
                image: game.background_image,
                name: game.name,
                genres: game.genres.map(genre => genre.name)
            }
        )))
    }
    return array[0].slice(0,15)
}

function queryMatch(data){
    if (data.length === 0) return 'No search queries.'
    else {
        let array = [];
        array.push(data.results.map(game => (
            {
                id : game.id,
                image: game.background_image,
                name: game.name,
                genres: game.genres.map(genre => genre.name)
            }
        )))
        if (array.length > 0) return array[0].slice(0,15)
        else return "No results."
    }
    
}

router.get('/', (req, res)=>{
    const { name } = req.query
    if (name) {
        fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
    .then(data => data.json())
    .then(data => res.status(200).json(queryMatch(data)))
    .catch(e => console.log('Unable to fetch with query.'))
    }
    else fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
    .then(data => data.json())
    .then(data => res.status(200).json(fetchGames(data)))
    .catch(e => console.log('Unable to fetch without query.'))    
})

module.exports = router;
