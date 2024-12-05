import { Router } from "express";
import  authRoutes  from "./authRoutes.js";
import usuarioRoutes from "./usuarioRoutes.js";
import orderRoutes from "./pedidoRoutes.js";

const mainRoutes = Router()

mainRoutes.use('/auth', authRoutes )
mainRoutes.use('/user', usuarioRoutes)
mainRoutes.use('/order', orderRoutes)

export default mainRoutes
