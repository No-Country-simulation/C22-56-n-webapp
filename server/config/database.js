import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';


dotenv.config();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const modelsPath = path.join(__dirname, '../models');

const uri = process.env.MONGODB_URI;

async function connectMongoDB() {
  try{
    const modelDefiners = [];    
    
    // Verificar si la carpeta existe
    if (!fs.existsSync(modelsPath)) {
      console.error("La carpeta 'models' no existe en la ruta especificada:", modelsPath);
      process.exit(1);
    }

    // Leer los archivos en la carpeta de modelos
    const modelFiles = fs.readdirSync(modelsPath)
      .filter(
        (file) =>
          file.indexOf(".") !== 0 && file.slice(-3) === ".js" // Solo archivos .js
      );

    // Importar los modelos usando import dinámico
    for (const file of modelFiles) {
      const model = await import(path.join(modelsPath, file));
      modelDefiners.push(model);
    }

    // Conectar a MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,           
    });

    console.log('MongoDB connection');

  }catch(error){
    console.log('MongoDB connection failed', error);
    process.exit(1)
  }
}

export default connectMongoDB;
