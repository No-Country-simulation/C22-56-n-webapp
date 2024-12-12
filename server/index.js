const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const contactoRoutes = require("./routes/contactoRoutes");
const productoRoutes = require("./routes/productoRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");

const User = require("./models/User");
const Producto = require("./models/Producto");
const Contacto = require("./models/Contacto");
const Pedido = require("./models/Pedido");
const ProductoPedido = require("./models/ProductoPedido");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tablas sincronizadas");
  })
  .catch((error) => {
    console.error("Error al sincronizar las tablas:", error);
  });

User.hasMany(Producto, {
  foreignKey: "userId",
  onDelete: "SET NULL",
});
Producto.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Contacto, {
  foreignKey: "userId",
  onDelete: "SET NULL",
});
Contacto.belongsTo(User, {
  foreignKey: "userId",
});

// Relación entre User y Pedido
User.hasMany(Pedido, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});

Pedido.belongsTo(User, {
  foreignKey: "userId"
});

// Relación entre Pedido y ProductoPedido
Pedido.hasMany(ProductoPedido, {
  foreignKey: "pedidoId",
  onDelete: "CASCADE"
});
ProductoPedido.belongsTo(Pedido, {
  foreignKey: "pedidoId"
});

// Relación entre Producto y ProductoPedido
Producto.hasMany(ProductoPedido, {
  foreignKey: "productoId"
});
ProductoPedido.belongsTo(Producto, {
  foreignKey: "productoId"
});


app.use("/api", userRoutes);
app.use("/api", contactoRoutes);
app.use("/api", productoRoutes);
app.use("/api", pedidoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
