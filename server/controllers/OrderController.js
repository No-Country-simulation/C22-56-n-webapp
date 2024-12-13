const Order = require("../models/Order");

// Crear un nuevo pedido
exports.createOrder = async (req, res) => {
  try {
    const { date, name, count, price, user } = req.body;
    const newOrder = await Order.create({
      date,
      name,
      count,
      price,
      userName: user.name,
      userEmail: user.email,
      userType: user.userType,
    });
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los pedidos
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Borrar el historial de pedidos
exports.clearOrderHistory = async (req, res) => {
  try {
    await Order.destroy({ where: {} });
    res.status(200).json({ message: "Historial de pedidos eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
