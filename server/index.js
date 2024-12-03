import express from 'express'
import mainRoutes from './routes/mainRoutes.js';
import connectMongoDB from './config/database.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';


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

//Middlewares
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Manejador de errores globales
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);   
});

//Correr en el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})
