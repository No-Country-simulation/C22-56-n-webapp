import UsuarioModel from "../models/UsuarioModel.js";

// Función para obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await UsuarioModel.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error: error.message });
  }
};

// Función para obtener un usuario por su ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validación de ID
    if (!id) {
      return res
        .status(400)
        .json({ message: "ID de usuario no proporcionado" });
    }

    const user = await UsuarioModel.findById(id).select("-password");

    // Verificar si el usuario existe
    if (!user) {
      return res
        .status(404)
        .json({ message: `No se encontró el usuario con el ID ${id}` });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener el usuario:", error.message);
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: error.message });
  }
};

// Función para actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos, email, username } = req.body;

    // Validar que el cuerpo de la solicitud contenga los campos requeridos
    if (!nombres || !apellidos || !email || !username) {
      return res.status(400).json({
        message: "Todos los campos son necesarios para actualizar el usuario.",
      });
    }

    // Actualizar el usuario en la base de datos
    const updatedUser = await UsuarioModel.findByIdAndUpdate(
      id,
      { nombres, apellidos, email, username },
      { new: true }
    ).select("-password");

    // Verificar si el usuario fue encontrado
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: `No se encontró el usuario con el ID ${id}` });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.message);
    res.status(500).json({
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

// Función para eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el ID haya sido proporcionado
    if (!id) {
      return res
        .status(400)
        .json({ message: "ID de usuario no proporcionado" });
    }

    // Buscar al usuario por ID
    const user = await UsuarioModel.findById(id);

    // Verificar si el usuario existe
    if (!user) {
      return res
        .status(404)
        .json({ message: `No se encontró el usuario con el ID ${id}` });
    }

    // Eliminar el usuario
    await UsuarioModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error.message);
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: error.message });
  }
};
