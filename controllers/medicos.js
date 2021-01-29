const { response } = require("express");

const Medico = require("./../models/medico");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find().populate("usuario", "nombre img").populate("hospital", "nombre img");
  
  res.status(200).json({
    error: 0,
    response: medicos,
  });
};

const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({ usuario: uid, ...req.body });

  try {
   const medicoDB = await medico.save();

    res.status(200).json({
      error: 0,
      response: medicoDB,
    });
  } catch (error) {
    res.status(500).json({
      error: 0,
      response: "Error inesperado",
    });
  }
};

const actualizarMedico = async (req, res = response) => {
  res.status(200).json({
    error: 0,
    response: "PUT",
  });
};

const eliminarMedico = async (req, res = response) => {
  const uid = req.params.id;

  res.status(200).json({
    error: 0,
    response: "Medico eliminado",
  });
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
};
