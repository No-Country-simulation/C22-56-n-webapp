import express from "express";
import rolMiddleware from "../middleware/rolMiddleware.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { check, validationResult } from "express-validator"; // Validación de datos

const router = express.Router();

// Middleware de validación para los parámetros de usuario
const validateUserId = [
  check("id").isMongoId().withMessage("ID de usuario no válido"),
];

// Obtener todos los usuarios (solo admin)
router.get("/", rolMiddleware(["admin"]), async (req, res, next) => {
  try {
    await getAllUsers(req, res);
  } catch (error) {
    next(error);
  }
});

// Obtener un usuario por ID (solo admin)
router.get(
  "/:id",
  [rolMiddleware(["admin"]), ...validateUserId],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await getUserById(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// Actualizar un usuario (solo admin)
router.put(
  "/:id",
  [rolMiddleware(["admin"]), ...validateUserId],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await updateUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// Eliminar un usuario (solo admin)
router.delete(
  "/:id",
  [rolMiddleware(["admin"]), ...validateUserId],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await deleteUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// Middleware para manejo de errores global
router.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({ message: "Ocurrió un error en el servidor", error: err.message });
});

export default router;
