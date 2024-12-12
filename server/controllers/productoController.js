const Producto = require("../models/Producto");

// Obtener productos (filtrados por el cuerpo de la solicitud)
const getProducts = async (req, res) => {
  const { name, price, description, stock } = req.body; // Desestructuramos los filtros desde el cuerpo

  try {
    let filter = {};

    // Si se proporciona 'name' en el cuerpo, filtramos por nombre
    if (name) {
      filter.name = name;
    }

    // Si se proporciona 'price' en el cuerpo, filtramos por precio
    if (price) {
      filter.price = price;
    }

    // Si se proporciona 'description' en el cuerpo, filtramos por descripción
    if (description) {
      filter.description = description;
    }

    // Si se proporciona 'stock' en el cuerpo, filtramos por stock
    if (stock) {
      filter.stock = stock;
    }

    // Buscamos los productos según el filtro
    const products = await Producto.findAll({ where: filter });
    res.json(products); // Devolvemos los productos encontrados en formato JSON
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener productos", error: error.message });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  const { name, price, description, image, stock } = req.body;

  try {
    // Creamos el nuevo producto en la base de datos
    const newProduct = await Producto.create({
      name,
      price,
      description,
      image,
      stock,
    });
    res.status(201).json(newProduct); // Devolvemos el producto creado en formato JSON
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear producto", error: error.message });
  }
};

// Actualizar un producto existente
const updateProduct = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID del producto desde los parámetros
  const { name, price, description, image, stock } = req.body; // Obtenemos los datos desde el cuerpo

  try {
    const product = await Producto.findByPk(id); // Buscamos el producto por ID

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" }); // Si no existe, devolvemos un error
    }

    // Actualizamos los campos solo si se proporcionan en el cuerpo
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.stock = stock || product.stock;

    await product.save(); // Guardamos el producto actualizado

    res.json(product); // Devolvemos el producto actualizado en formato JSON
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el producto",
      error: error.message,
    });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID desde los parámetros de la solicitud

  try {
    const product = await Producto.findByPk(id); // Buscamos el producto por ID

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" }); // Si no existe, devolvemos un error
    }

    await product.destroy(); // Eliminamos el producto de la base de datos

    res.json({ message: "Producto eliminado" }); // Devolvemos un mensaje de éxito
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el producto", error: error.message });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
