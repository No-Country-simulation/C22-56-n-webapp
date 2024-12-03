import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    usuarioId:{
        type : mongoose.Schema.Types.ObjectId , 
        ref:'Usuario' , 
        required: true
    },
    productos:[
        {
            productoId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Producto', 
                required: true 
            }, 
            cantidad: { 
                type: Number, 
                required: true 
            }, precio: { 
                type: Number, 
                required: true 
            }
        }
    ],
    estado: { 
        type: String, 
        enum: ['pendiente', 'entregado', 'cancelado'], 
        required: true 
    }, 
        
    montoTotal: { 
        type: Number, 
        required: true 
    }, 
    fechaCreacion: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model('Orden', OrderSchema )

