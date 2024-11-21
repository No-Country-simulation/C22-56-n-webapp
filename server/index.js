import express from 'express'
import mainRoutes from './routes/mainRoutes.js';
import connectMongoDB from './config/database.js';

//Conectar DB

const app = express();

const PORT = process.env.PORT || 5000

// conexion a la base de datos
connectMongoDB();

//Principal
app.use('/', (req, res) => {
    res.send('Welcome to TEAM C22-56-N-WEBAPP API')
})

//rutas
app.use('/api', mainRoutes)

// Manejador de errores globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal!' });
});

//Correr en el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})
