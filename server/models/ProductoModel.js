import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    categoria: { type: String, required: true },    
    fechaCreacion: { type: Date, default: Date.now },
});

const ProductoModel = mongoose.model('Producto', ProductoSchema);
export default ProductoModel;

