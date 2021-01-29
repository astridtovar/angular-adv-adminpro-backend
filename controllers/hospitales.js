const { response } = require("express");

const Hospital = require("./../models/hospital");

const getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre img");
  res.status(200).json({
    error: 0,
    response: hospitales,
  });
};

const crearHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ usuario: uid, ...req.body });

  try {
    const hospitalDB = await hospital.save();

    res.status(200).json({
      error: 0,
      response: hospitalDB,
    });
  } catch (error) {
    res.status(500).json({
      error: 0,
      response: "Error inesperado",
    });
  }
};

const actualizarHospital = async (req, res = response) => {
  res.status(200).json({
    error: 0,
    response: "PUT",
  });
};

const eliminarHospital = async (req, res = response) => {
  const uid = req.params.id;

  res.status(200).json({
    error: 0,
    response: "Hospital eliminado",
  });
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  eliminarHospital,
};
