const { Router } = require('express');
const { Videogame } = require('../db.js');

const router = Router();




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res) => {

    Videogame.findAll({}).then(data => res.json(data))


})


module.exports = router;