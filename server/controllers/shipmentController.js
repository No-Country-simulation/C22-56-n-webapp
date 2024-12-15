const Shipment = require("../models/Shipment");

exports.createShipment = async (req, res) => {
  try {
    const { date, name, count, price, user } = req.body;
    const newShipment = await Shipment.create({
      date,
      name,
      count,
      price,
      userName: user.name,
      userEmail: user.email,
      userType: user.userType,
    });
    res.status(201).json(newShipment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los envíos
exports.getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.findAll();
    res.status(200).json(shipments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un envío por ID
exports.deleteShipment = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID del envío desde los parámetros de la URL
  try {
    const shipment = await Shipment.findByPk(id); // Buscamos el envío por su ID
    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" }); // Si no existe, respondemos con un error 404
    }
    await shipment.destroy(); // Eliminamos el envío de la base de datos
    res.status(200).json({ message: "Shipment deleted successfully" }); // Respondemos con un mensaje de éxito
  } catch (err) {
    res.status(400).json({ error: err.message }); // Si ocurre un error, lo capturamos y respondemos con el error
  }
};

// Borrar el historial de envíos (eliminar todos los envíos)
exports.clearShipmentHistory = async (req, res) => {
  try {
    await Shipment.destroy({ where: {} });
    res.status(200).json({ message: "Shipment history cleared" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
