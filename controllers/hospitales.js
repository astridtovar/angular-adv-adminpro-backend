const { response } = require("express");
const hospital = require("./../models/hospital");

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
      error: 1,
      response: "Error inesperado",
    });
  }
};

const actualizarHospital = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      res.status(404).json({
        error: 1,
        response: "El hospital no existe",
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      { new: true }
    );

    res.status(200).json({
      error: 0,
      response: hospitalActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 1,
      response: "Error inesperado",
    });
  }
};

const eliminarHospital = async (req, res = response) => {
  const id = req.params.id;

  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      res.status(404).json({
        error: 1,
        response: "El hospital no existe",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.status(200).json({
      error: 0,
      response: "Hospital eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 1,
      response: "Error inesperado",
    });
  }
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  eliminarHospital,
};
