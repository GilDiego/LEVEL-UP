const { Router } = require('express');
const fetch = require("node-fetch");
require('dotenv').config();
const { API_KEY } = process.env;

const router = Router();


function fetchGames(data) {
    let array = []

    array.push(data.results.map(game => (
        {
            id: game.id,
            image: game.background_image,
            name: game.name,
            genres: game.genres.map(genre => genre.name),
            rating: game.rating
        }
    )))

    return array[0]
}

function queryMatch(data) {
    if (data.length === 0) return 'No search queries.'
    else {
        let array = [];
        array.push(data.results.map(game => (
            {
                id: game.id,
                image: game.background_image,
                name: game.name,
                genres: game.genres.map(genre => genre.name)
            }
        )))
        if (array.length > 0) return array[0].slice(0, 100)
        else return "No results."
    }

}

router.get('/', async (req, res) => {
    const { name } = req.query
    const { page } = req.query
    if (name) {
        fetch(`https://api.rawg.io/api/games?count=100&key=${API_KEY}&search=${name}`)
            .then(data => data.json())
            .then(data => res.status(200).json(queryMatch(data)))
            .catch(e => console.log('Unable to fetch with query.'))
    }
    else {
        fetch(`https://api.rawg.io/api/games?page=${page}&page_size=10&key=${API_KEY}`)
            .then((data) => data.json())
            .then(data => res.status(200).json(fetchGames(data)))
            .catch(e => console.log(e))
    }
})

module.exports = router;
