import mongoose from "mongoose";
import { hash } from "bcryptjs";

const UsuarioSchema = new mongoose.Schema({
    nombres:{
        type : String,
        required: true
    },
    apellidos:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    rol:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
},{
    timestamps: true 
})

//Middleware para cambio de contraseña
UsuarioSchema.pre('save', async (next) => {
    if(!this.isModified('password')) return next;
    
    this.password = await hash(this.password, 10)
})

//Comparar contraseñas para Auth
UsuarioSchema.methods.comparePassword = async (contrasenia) => {
    return bcrypt.compare(contrasenia, this.password)
} 

//Exportar modelo
export default mongoose.model('Usuario', UsuarioSchema)