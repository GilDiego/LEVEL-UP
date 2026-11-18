const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('videogame', {
    idDB: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.id}DB`;
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
