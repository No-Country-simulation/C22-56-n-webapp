import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El campo usuarioId es obligatorio."], // Añadí un mensaje de error más claro
  },
  productos: [
    {
      productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: [true, "El campo productoId es obligatorio."], // Validación más clara
      },
      cantidad: {
        type: Number,
        required: [true, "La cantidad es obligatoria."],
        min: [1, "La cantidad mínima de productos es 1."], // Validación para evitar cantidades negativas o 0
      },
      precio: {
        type: Number,
        required: [true, "El precio del producto es obligatorio."],
        min: [0, "El precio no puede ser negativo."], // Validación para evitar precios negativos
      },
    },
  ],
  estado: {
    type: String,
    enum: ["pendiente", "entregado", "cancelado"],
    required: [true, "El estado es obligatorio."],
  },
  montoTotal: {
    type: Number,
    required: [true, "El monto total es obligatorio."],
    min: [0, "El monto total no puede ser negativo."], // Validación para evitar montos negativos
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook para asegurar que el montoTotal se calcule correctamente antes de guardar el pedido
OrderSchema.pre("save", function (next) {
  // Calcular el montoTotal basándose en los productos y precios
  if (this.productos && this.productos.length > 0) {
    this.montoTotal = this.productos.reduce((total, producto) => {
      return total + producto.cantidad * producto.precio;
    }, 0);
  }
  next();
});

export default mongoose.model("Orden", OrderSchema);
