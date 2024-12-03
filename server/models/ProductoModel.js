import mongoose from "mongoose";

// Esquema del producto
const ProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del producto es obligatorio."],
    trim: true,
  },
  descripcion: {
    type: String,
    required: [true, "La descripción del producto es obligatoria."],
    trim: true,
  },
  precio: {
    type: Number,
    required: [true, "El precio del producto es obligatorio."],
    min: [0, "El precio no puede ser negativo."],
  },
  cantidad: {
    type: Number,
    required: [true, "La cantidad del producto es obligatoria."],
    min: [0, "La cantidad no puede ser negativa."],
  },
  categoria: {
    type: String,
    required: [true, "La categoría del producto es obligatoria."],
    enum: ["Electrónica", "Ropa", "Hogar", "Alimentos", "Juguetes"],
    trim: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
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

// Índices para mejorar consultas
ProductoSchema.index({ categoria: 1, nombre: 1 });

// Middleware para manejar actualizaciones
ProductoSchema.pre("save", function (next) {
  if (this.isModified("precio")) {
    this.historialPrecios.push({ precio: this.precio });
  }
  next();
});

// Método para calcular el valor total
ProductoSchema.methods.calcularValorTotal = function () {
  return this.precio * this.cantidad;
};

// Exportar el modelo
const ProductoModel = mongoose.model("Producto", ProductoSchema);

export default ProductoModel;
