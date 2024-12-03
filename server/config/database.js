import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

dotenv.config();

// Asegurarse de que las variables de entorno estén definidas
const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  console.error("Falta la variable de entorno MONGODB_URI.");
  process.exit(1);
}

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const modelsPath = path.resolve(__dirname, "../models");

/**
 * Función para conectar a MongoDB y cargar los modelos dinámicamente.
 */
async function connectMongoDB() {
  try {
    // Verificar si la carpeta 'models' existe
    if (!fs.existsSync(modelsPath)) {
      console.error(`La carpeta 'models' no existe en la ruta: ${modelsPath}`);
      process.exit(1);
    }

    // Cargar todos los archivos de modelos dinámicamente
    const modelFiles = fs
      .readdirSync(modelsPath)
      .filter((file) => file.endsWith(".js") && !file.startsWith("."));

    if (modelFiles.length === 0) {
      console.warn(`No se encontraron modelos en la carpeta: ${modelsPath}`);
    }

    // Cargar los modelos de manera dinámica
    const modelDefiners = [];
    for (const file of modelFiles) {
      try {
        const model = await import(path.join(modelsPath, file));
        modelDefiners.push(model);
        console.log(`Modelo cargado: ${file}`);
      } catch (error) {
        console.error(`Error al cargar el modelo ${file}:`, error);
      }
    }

    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Conexión exitosa a MongoDB.");
  } catch (error) {
    console.error("Error en la conexión a MongoDB:", error);
    process.exit(1);
  }
}

export default connectMongoDB;
