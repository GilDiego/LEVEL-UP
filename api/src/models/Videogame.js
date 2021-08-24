const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    idDB:{
      type: DataTypes.VIRTUAL,
      get(){
        return `${this.id}DB`
      }
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
    release:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
