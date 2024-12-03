import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Ruta para el inicio de sesión
router.post("/login", async (req, res, next) => {
  try {
    await login(req, res); // Llamada al controlador de login
  } catch (error) {
    next(error); // Manejo de errores
  }
});

// Ruta para el registro de un nuevo usuario
router.post("/register", async (req, res, next) => {
  try {
    await register(req, res); // Llamada al controlador de registro
  } catch (error) {
    next(error); // Manejo de errores
  }
});

export default router;
