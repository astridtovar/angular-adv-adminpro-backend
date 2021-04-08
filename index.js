require("dotenv").config();
const path = require("path");
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

// Directorio publico
app.use(express.static("public"));

// Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/hospitales", require("./routes/hospitales"));
app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/todo", require("./routes/busquedas"));
app.use("/api/uploads", require("./routes/uploads"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto: " + process.env.PORT);
});

//
