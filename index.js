require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

const app = express();

// Configuracion cors
app.use(cors());

// Lectura y parseo Body
app.use(express.json());

// Base datos
dbConnection();

// Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto: " + process.env.PORT);
});

//
