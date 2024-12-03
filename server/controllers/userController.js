import UsuarioModel from "../models/UsuarioModel.js"

export const getAllUsers = async(req, res) => {
    try {
        const users = await UsuarioModel.find().select('-password')
        res.json(users)
    } catch (error) {
        
    }
}

export const getUserById = async(req, res) => {
    try {
        const user = await UsuarioModel.findById(req.params.id).select('-password')

        if(!user) return res.status(404).json({message: `No se encontro el usuario con el ID ${req.params.id}`})
        
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
export const updateUser = async(req, res) => {
    try {
       const {nombres, apellidos, email, username} = req.body

       const newUser = await UsuarioModel.findByIdAndUpdate(
        req.params.id,
        {nombres, apellidos, email, username},
        {new: true}
       ).select('-password')

       if(!newUser) return res.status(404).json({message: `No se encontro el usuario con el ID ${req.params.id}`})
       res.status(200).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteUser = async(req, res) => {
    try {
        const user = await UsuarioModel.findById(req.params.id)
        if(!user) return res.status(404).json({message: `No se encontro el usuario con el ID ${req.params.id}`})
        
        res.status(200).json('Usuario Eliminado Exitosamente')
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
