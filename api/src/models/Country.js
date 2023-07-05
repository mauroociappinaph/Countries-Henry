const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgFlag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
   
  }, {
    timestamps: false
  }
  );
};