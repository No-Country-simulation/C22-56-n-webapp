const express = require("express");

const {
  createPedido,
  getPedidos,
  getPedidoById,
} = require("../controllers/PedidoController");

const router = express.Router();

router.get("/pedidos", getPedidos);
router.get("/pedidos/:id", getPedidoById);
router.post("/pedidos", createPedido);

module.exports = router;
