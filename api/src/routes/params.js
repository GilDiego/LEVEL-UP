const { Router } = require('express');
const fetch = require("node-fetch");
require('dotenv').config();
const { API_KEY } = process.env;

// [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
// [ ] Descripción
// [ ] Fecha de lanzamiento
// [ ] Rating
// [ ] Plataformas

function paramsMatch(data, id){
if (data && id){
    if (data.id == id){    
        return {     
            id : data.id,
            image: data.background_image,
            name: data.name,
            genres: data.genres.map(genre => genre.name),
            release: data.released,
            rating: `${data.rating} / ${data.rating_top}`,
            platforms: data.platforms.map(platform => platform.platform.name),
            description: data.description
        }
    } else {
            return {error: 'No match for the ID recieved'}
    }
    }else {
        return {error: 'No param was recieved.'}
    }
}

const router = Router( {mergeParams: true} );

router.get('/', (req, res)=>{
    const { id } = req.params
    console.log(id)
    fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    .then(data => data.json())  
    .then(data => res.status(200).send(paramsMatch(data, id)))
})

module.exports = router;