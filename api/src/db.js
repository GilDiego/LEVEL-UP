const { Sequelize } = require('sequelize');
const defineVideogame = require('./models/Videogame');
const defineGenre = require('./models/Genre');
const { databaseUrl } = require('./config');

const sequelize = new Sequelize(databaseUrl, { logging: false });

const Videogame = defineVideogame(sequelize);
const Genre = defineGenre(sequelize);

Videogame.belongsToMany(Genre, { through: 'videogame_genre' });
Genre.belongsToMany(Videogame, { through: 'videogame_genre' });

module.exports = { Videogame, Genre, conn: sequelize };
