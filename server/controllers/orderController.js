import OrderModel from "../models/PedidoModel.js";

export const createOrder = async (req, res) => {
    try {
        const { 
            usuarioId, 
            productos, 
            totalPrice 
        } = req.body;

        const newOrder = new OrderModel(
            usuarioId,
            productos,
            totalPrice
        );

    await newOrder.save();
    res.status(201).json({ message: 'Pedido creado exitosamente'});
  
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el pedido', error });
    }
};


export const getAllOrders = async (req, res) => {
  try {
    const userId = req.params;

    if(!userId){
        return res.status(404).json({message: `No se encontro el producto con el ID ${req.params.id}`})
    }

    const orders = await OrderModel.find({ usuarioId }).populate('Productos.productoId');
    res.status(200).json(orders);
  
} catch (error) {
    res.status(500).json({ message: 'Error al obtener los pedidos', error });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id).populate('Productos.productoId');
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el pedido', error });
  }
};


export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: 'Pedido no encontrado' });

    res.status(200).json({ message: 'Pedido actualizado exitosamente', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el pedido', error });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await OrderModel.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ message: 'Pedido no encontrado' });

    res.status(200).json({ message: 'Pedido eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el pedido', error });
  }
};
