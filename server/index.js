const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const contactoRoutes = require("./routes/contactoRoutes");
const productoRoutes = require("./routes/productoRoutes");

dotenv.config();

const app = express();
app.use(bodyParser.json());

connectDB();

app.use("/api", userRoutes);
app.use("/api", contactoRoutes);
app.use("/api", productoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
