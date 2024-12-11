const express = require("express");
const {
  getProducts,
  createProduct,
} = require("../controllers/productoController");

const router = express.Router();

router.get("/productos", getProducts);
router.post("/productos", createProduct);

module.exports = router;
