import jsonwebtoken from "jsonwebtoken";
import UsuarioModel from "../models/UsuarioModel.js";

// Función para manejar el registro de usuario
export const register = async (req, res) => {
  try {
    // Validación de los datos recibidos
    const { nombre, apellidos, email, username, password } = req.body;

    if (!nombre || !apellidos || !email || !username || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos." });
    }

    // Comprobar si el usuario ya existe
    const existingUser = await UsuarioModel.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya está en uso." });
    }

    // Crear un nuevo usuario
    const user = new UsuarioModel({
      nombre,
      apellidos,
      email,
      username,
      password,
    });

    // Guardar el usuario en la base de datos
    await user.save();

    res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    console.error("Error en el registro del usuario:", error.message);
    res.status(500).json({
      message: "Error al registrar el usuario, por favor intente nuevamente.",
    });
  }
};

// Función para manejar el login de usuario
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "El nombre de usuario y la contraseña son requeridos.",
      });
    }

    // Buscar el usuario por nombre de usuario
    const user = await UsuarioModel.findOne({ username: username.trim() });

    // Validar si el usuario existe y si la contraseña es correcta
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ message: "Credenciales inválidas o contraseña incorrecta." });
    }

    // Verificar si el SECRET_KEY está definido
    if (!process.env.SECRET_KEY) {
      console.error("SECRET_KEY no está definido en el entorno.");
      return res.status(500).json({
        message: "Error en el servidor, por favor intente más tarde.",
      });
    }

    // Crear el token de autenticación
    const token = jsonwebtoken.sign(
      {
        id: user._id,
        name: `${user.nombres} ${user.apellidos}`,
        email: user.email,
        username: user.username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "12h" }
    );

    // Enviar el token al usuario
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error en el login del usuario:", error.message);
    res.status(400).json({ message: error.message });
  }
};
