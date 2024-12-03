import OrderModel from "../models/PedidoModel";

// Función para crear un nuevo pedido
export const createOrder = async (req, res) => {
  try {
    const { usuarioId, productos, totalPrice } = req.body;

    // Validación básica de los datos recibidos
    if (!usuarioId || !productos || !totalPrice) {
      return res
        .status(400)
        .json({ message: "Faltan datos requeridos para crear el pedido." });
    }

    // Crear el nuevo pedido
    const newOrder = new OrderModel({ usuarioId, productos, totalPrice });

    // Guardar el pedido en la base de datos
    await newOrder.save();

    res
      .status(201)
      .json({ message: "Pedido creado exitosamente", order: newOrder });
  } catch (error) {
    console.error("Error al crear el pedido:", error.message);
    res.status(500).json({
      message: "Error al crear el pedido, por favor intente nuevamente.",
      error,
    });
  }
};

// Función para obtener los pedidos de un usuario por ID
export const getUserOrdersById = async (req, res) => {
  try {
    const { id: userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "ID de usuario no proporcionado." });
    }

    // Obtener los pedidos del usuario con el ID proporcionado
    const orders = await OrderModel.find({ usuarioId: userId }).populate(
      "Productos.productoId"
    );

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        message: `No se encontraron pedidos para el usuario con ID ${userId}`,
      });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error al obtener los pedidos del usuario:", error.message);
    res.status(500).json({
      message: "Error al obtener los pedidos, por favor intente nuevamente.",
      error,
    });
  }
};

// Función para obtener un pedido por su ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "ID de pedido no proporcionado." });
    }

    // Buscar el pedido por su ID
    const order = await OrderModel.findById(id).populate(
      "Productos.productoId"
    );

    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error al obtener el pedido:", error.message);
    res.status(500).json({
      message: "Error al obtener el pedido, por favor intente nuevamente.",
      error,
    });
  }
};

// Función para actualizar el estado de un pedido
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ message: "El estado del pedido es requerido." });
    }

    // Actualizar el estado del pedido
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.status(200).json({
      message: "Pedido actualizado exitosamente",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error al actualizar el pedido:", error.message);
    res.status(500).json({
      message: "Error al actualizar el pedido, por favor intente nuevamente.",
      error,
    });
  }
};

// Función para eliminar un pedido
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar el pedido por su ID
    const deletedOrder = await OrderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.status(200).json({ message: "Pedido eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el pedido:", error.message);
    res.status(500).json({
      message: "Error al eliminar el pedido, por favor intente nuevamente.",
      error,
    });
  }
};
