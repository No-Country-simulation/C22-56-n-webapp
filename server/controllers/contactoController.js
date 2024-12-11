// controllers/contactoController.js
const Contacto = require("../models/Contacto");

const createMessage = async (req, res) => {
  const { nombre, correo, mensaje } = req.body;
  try {
    const newMessage = await Contacto.create({ nombre, correo, mensaje });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error al enviar el mensaje" });
  }
};

module.exports = { createMessage };
