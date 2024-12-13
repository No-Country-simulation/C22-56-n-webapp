const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

// Ruta para crear un nuevo pedido
router.post("/orders", orderController.createOrder);

// Ruta para obtener todos los pedidos
router.get("/orders", orderController.getOrders);

// Ruta para eliminar el historial de pedidos
router.delete("/orders", orderController.clearOrderHistory);

module.exports = router;
