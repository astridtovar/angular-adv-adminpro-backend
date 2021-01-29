const { response } = require("express");

const Usuario = require("./../models/usuario");
const Medico = require("./../models/medico");
const Hospital = require("./../models/hospital");

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  res.status(200).json({
    error: 0,
    response: { usuarios, medicos, hospitales },
  });
};

const getDocumentosCollecion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  let resultados = [];

  switch (tabla) {
    case "medicos":
      resultados = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");
      break;
    case "hospitales":
      resultados = await Hospital.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );
      break;
    case "usuarios":
      resultados = await Usuario.find({ nombre: regex });
      break;
    default:
      res.status(400).json({
        error: 1,
        response: "No exite esa coleccion",
      });
      break;
  }

  res.status(200).json({
    error: 0,
    response: resultados,
  });
};

module.exports = {
  getTodo,
  getDocumentosCollecion,
};
