// controllers/productoController.js
const Producto = require("../models/Producto");

const getProducts = async (req, res) => {
  try {
    const products = await Producto.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

const createProduct = async (req, res) => {
  const { name, price, description, image, stock } = req.body;
  try {
    const newProduct = await Producto.create({
      name,
      price,
      description,
      image,
      stock,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto" });
  }
};

module.exports = { getProducts, createProduct };
