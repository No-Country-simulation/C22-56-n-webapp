// controllers/pedido.js
const Pedido = require("../models/Pedido");
const ProductoPedido = require("../models/ProductoPedido");
const Producto = require("../models/Producto");

const createPedido = async (req, res) => {
  const { userId, productos, estado, montoTotal } = req.body;

  if (!userId || !productos || !estado || !montoTotal) {
    return res
      .status(400)
      .json({ error: "Faltan datos requeridos en el cuerpo de la solicitud" });
  }
  try {
    // Crear el pedido
    const nuevoPedido = await Pedido.create({
      userId,
      estado,
      montoTotal,
      fechaCreacion: new Date(),
    });

    // Crear los productos del pedido
    await Promise.all(
      productos.map(async (producto) => {
        await ProductoPedido.create({
          pedidoId: nuevoPedido.id,
          productoId: producto.productoId,
          cantidad: producto.cantidad,
          precio: producto.precio,
        });
      })
    );

    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el pedido", error });
  }
};

const getPedidoById = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id, {
      include: [
        {
          model: ProductoPedido,
          include: [Producto],
        },
      ],
    });

    if (pedido) {
      res.json(pedido);
    } else {
      res.status(404).json({ error: "Pedido no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el pedido" });
  }
};

const getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [
        {
          model: ProductoPedido,
          include: [Producto],
        },
      ],
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error al listar los pedidos" });
  }
};

module.exports = { createPedido, getPedidoById, getPedidos };
