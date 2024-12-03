import mongoose from "mongoose";

// Esquema del producto
const ProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del producto es obligatorio."],
    trim: true, // Elimina espacios adicionales al principio o final
  },
  descripcion: {
    type: String,
    required: [true, "La descripción del producto es obligatoria."],
    trim: true, // Elimina espacios adicionales al principio o final
  },
  precio: {
    type: Number,
    required: [true, "El precio del producto es obligatorio."],
    min: [0, "El precio no puede ser negativo."], // Validación para evitar precios negativos
  },
  cantidad: {
    type: Number,
    required: [true, "La cantidad del producto es obligatoria."],
    min: [0, "La cantidad no puede ser negativa."], // Validación para evitar cantidades negativas
  },
  categoria: {
    type: String,
    required: [true, "La categoría del producto es obligatoria."],
    enum: ["Electrónica", "Ropa", "Hogar", "Alimentos", "Juguetes"], // Validación para limitar las categorías
    trim: true, // Elimina espacios adicionales al principio o final
  },
  fechaCreacion: {
    type: Date,
    default: Date.now, // Valor predeterminado es la fecha y hora actual
  },
  historialPrecios: [
    {
      fecha: {
        type: Date,
        default: Date.now,
      },
      precio: {
        type: Number,
        required: true,
        min: [0, "El precio no puede ser negativo."],
      },
    },
  ],
});

// Añadir un índice para mejorar el rendimiento de las consultas por categoría y nombre
ProductoSchema.index({ categoria: 1, nombre: 1 });

// Pre-save hook para validar que la cantidad y el precio estén correctos antes de guardar el producto
ProductoSchema.pre("save", function (next) {
  if (this.precio < 0 || this.cantidad < 0) {
    return next(
      new Error("El precio y la cantidad deben ser números positivos.")
    );
  }

  // Registrar el precio en el historial de precios antes de guardar el producto
  this.historialPrecios.push({
    precio: this.precio,
  });

  next();
});

// Método para calcular el valor total del producto
ProductoSchema.methods.calcularValorTotal = function () {
  return this.precio * this.cantidad;
};

// Crear y exportar el modelo
const ProductoModel = mongoose.model("Producto", ProductoSchema);

export default ProductoModel;
