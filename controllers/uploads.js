const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = async (req, res = response) => {
  const coleccion = req.params.coleccion;
  const id = req.params.id;

  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(coleccion)) {
    return res.status(400).json({
      error: 1,
      response: "No existe la coleccion",
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      error: 1,
      response: "No hay ningun archivo",
    });
  }

  const file = req.files.imagen;
  const nombreCortado = file.name.split(".");
  const extensionArc = nombreCortado[nombreCortado.length - 1];

  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionArc)) {
    return res.status(400).json({
      error: 1,
      response: "Extensión no valida",
    });
  }

  //   Generar nombre archivo
  const nombreArchivo = `${uuidv4()}.${extensionArc}`;

  //   Path guardar imagen
  const path = `./uploads/${coleccion}/${nombreArchivo}`;

  // Mover img
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: 1,
        response: "Error al mover la imagen.",
      });
    }

    // Actualizar bd
    actualizarImagen(coleccion, id, nombreArchivo);

    res.status(200).json({
      error: 0,
      response: { message: "Archivo subido", nombreArchivo },
    });
  });
};

const getUpload = (req, res = response) => {
  const coleccion = req.params.coleccion;
  const foto = req.params.foto;

  const pathImg = path.join(__dirname, `../uploads/${coleccion}/${foto}`);

  // Imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    res.sendFile(path.join(__dirname, `../uploads/default.png`));
  }
};

module.exports = {
  fileUpload,
  getUpload,
};
