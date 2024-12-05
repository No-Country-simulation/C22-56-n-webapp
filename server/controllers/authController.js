import jsonwebtoken from 'jsonwebtoken'
import UsuarioModel from '../models/UsuarioModel.js'

export const register = async (req, res) => {
    try {
        const {
            nombres, 
            apellidos,  
            email, 
            username, 
            password
        } = req.body

        const user = new UsuarioModel({
            nombres,
            apellidos,
            email, 
            username, 
            password
        })

        await user.save();
        res.status(201).json({message:'Usuario Registrado Exitosamente'})   

    } catch (error) {
        console.error("Error en el logueo de usuario " + error)
    }
}

export const login = async (req, res) => {
    try {
        const { username, password} = req.body

        const user = await UsuarioModel.findOne({username: username.trim()})

        if(!user || (!await user.comparePassword(password)) ){
            return res.status(401).json({message: 'Credenciales invalidas o contraseña incorrecta'})
        }

        const token = jsonwebtoken.sign(
            {
                id: user._id,
                name: `${user.nombres} ${user.apellidos}`,
                email: user.email,
                username: user.username
            }, 
            process.env.SECRET_KEY, 
            {expiresIn: '12h'}
        )

        res.status(200).json({token})

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
