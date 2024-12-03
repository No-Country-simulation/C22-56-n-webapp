import { Router } from "express";
import authRoutes from "./authRoutes.js";
import usuarioRoutes from "./usuarioRoutes.js";

const mainRoutes = Router();

// Usar las rutas de autenticación (registro, login, etc.)
mainRoutes.use("/auth", authRoutes);

// Usar las rutas relacionadas con los usuarios (perfil, gestión, etc.)
mainRoutes.use("/user", usuarioRoutes);

// Middleware para manejar errores (global)
// Este middleware captura cualquier error de las rutas anteriores
mainRoutes.use((err, req, res, next) => {
  console.error(err); // Log del error para depuración
  res
    .status(500)
    .json({ message: "Ocurrió un error en el servidor", error: err.message });
});

export default mainRoutes;
