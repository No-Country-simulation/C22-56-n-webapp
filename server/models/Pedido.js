const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Pedido = sequelize.define("Pedido", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  estado: {
    type: DataTypes.ENUM("pendiente", "entregado", "cancelado"),
    allowNull: false,
  },
  montoTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Pedido;
