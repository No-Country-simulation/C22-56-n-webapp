import { Router } from "express.js";
import { authRoutes } from "./authRoutes.js";
import {usuarioRoutes} from "./usuarioRoutes.js";

const mainRoutes = Router()

mainRoutes.use('/auth', authRoutes )
mainRoutes.use('/user', usuarioRoutes)

export default mainRoutes