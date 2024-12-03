import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Corregido para usar bcryptjs correctamente

const UsuarioSchema = new mongoose.Schema(
  {
    nombres: {
      type: String,
      required: [true, "El nombre es obligatorio."],
      trim: true, // Elimina espacios adicionales antes o después del nombre
    },
    apellidos: {
      type: String,
      required: [true, "Los apellidos son obligatorios."],
      trim: true, // Elimina espacios adicionales antes o después de los apellidos
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio."],
      unique: true, // Asegura que no haya dos usuarios con el mismo correo
      lowercase: true, // Convierte el correo a minúsculas para normalizarlo
      match: [
        /\S+@\S+\.\S+/,
        "Por favor ingrese un correo electrónico válido.",
      ], // Expresión regular para validar el formato del correo
    },
    username: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio."],
      unique: true, // Asegura que no haya dos usuarios con el mismo nombre de usuario
      trim: true, // Elimina espacios antes o después del nombre de usuario
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria."],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres."], // Asegura que la contraseña sea lo suficientemente larga
    },
    rol: {
      type: String,
      enum: ["admin", "user"],
      default: "user", // Por defecto, el rol es "user"
    },
  },
  {
    timestamps: true, // Agrega campos de "createdAt" y "updatedAt"
  }
);

// Middleware para encriptar la contraseña antes de guardarla
UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Si la contraseña no fue modificada, no hacemos nada

  try {
    this.password = await bcrypt.hash(this.password, 10); // Hashea la contraseña con un "salt" de 10 rondas
    next();
  } catch (error) {
    next(error); // Si ocurre un error, pasamos al siguiente middleware o manejador de errores
  }
});

// Método para comparar contraseñas
UsuarioSchema.methods.comparePassword = async function (contrasenia) {
  try {
    return await bcrypt.compare(contrasenia, this.password); // Compara la contraseña ingresada con el hash guardado
  } catch (error) {
    throw new Error("Error al comparar las contraseñas.");
  }
};

// Exportar el modelo
export default mongoose.model("Usuario", UsuarioSchema);
