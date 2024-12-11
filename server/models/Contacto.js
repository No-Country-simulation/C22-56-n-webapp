const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Contacto = sequelize.define("Contacto", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mensaje: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Contacto;
