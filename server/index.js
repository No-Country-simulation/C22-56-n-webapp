import express from 'express'
import mainRoutes from './routes/mainRoutes.js';
import connectMongoDB from './config/database.js';
import cors from 'cors';
import 'dotenv/config'



//Conectar DB

const app = express();
app.use(express.json())


// conexion a la base de datos
connectMongoDB();

//Configuracion del cors
const allow_origin = process.env.ALLOW_SITE_URL
const options = {
    origin: allow_origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'], 
}

app.use(cors(options))

//Ruta Principal
app.get('/', (req, res) => {
    res.send('Welcome to TEAM C22-56-N-WEBAPP API')
})

//rutas
app.use('/api', mainRoutes)


// Manejador de errores globales
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);   
});

//Correr en el puerto
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})
