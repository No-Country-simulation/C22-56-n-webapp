import express from "express";
import dotenv from "dotenv";
import mainRoutes from "./routes/mainRoutes.js";
import connectMongoDB from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet"; // Protección de seguridad adicional

// Configuración de dotenv para manejar variables de entorno
dotenv.config();

const app = express();
app.use(express.json());

// Establecer el puerto de manera flexible
const PORT = process.env.PORT || 5000;

// Conexión a la base de datos
connectMongoDB().catch((err) => {
  console.error("Error en la conexión a MongoDB:", err.message);
  process.exit(1); // Terminar el proceso si la conexión falla
});

// Rutas principales de la API
app.use("/", (req, res) => {
  res.send("Welcome to TEAM C22-56-N-WEBAPP API");
});

// Rutas de la API
app.use("/api", mainRoutes);

// Middlewares
app.use(morgan("dev")); // Registro de logs en desarrollo
app.use(helmet()); // Seguridad adicional
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // Usar origen permitido desde las variables de entorno
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: true, // Si necesitas manejar cookies con CORS
  })
);

// Body parser - Uso nativo de express para evitar dependencias extra
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Manejador de errores globales (Captura errores y responde de forma uniforme)
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const status = err.status || 500;
  const message = err.message || "Ocurrió un error en el servidor";
  res.status(status).json({ error: message });
});

// Correr en el puerto configurado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
