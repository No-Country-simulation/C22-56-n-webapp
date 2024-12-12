const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// Maneja la relación de muchos a muchos entre Pedidos y productos.
const ProductoPedido = sequelize.define('ProductoPedido', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pedidoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Pedidos',
        key: 'id',
      },
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Productos',
        key: 'id',
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  


module.exports = ProductoPedido;