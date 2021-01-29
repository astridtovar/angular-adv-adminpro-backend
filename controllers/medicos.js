const { response } = require("express");

const Medico = require("./../models/medico");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre img")
    .populate("hospital", "nombre img");

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
  const id = req.params.id;
  const uid = req.uid;

  try {
    const medicoDB = await Medico.findById(id);

    if (!medicoDB) {
      res.status(404).json({
        error: 1,
        response: "El medico no existe",
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambiosMedico,
      { new: true }
    );

    res.status(200).json({
      error: 0,
      response: medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 1,
      response: "Error inesperado",
    });
  }
};

const eliminarMedico = async (req, res = response) => {
  const id = req.params.id;

  try {
    const medicoDB = await Medico.findById(id);

    if (!medicoDB) {
      res.status(404).json({
        error: 1,
        response: "El hospital no existe",
      });
    }

    await Medico.findByIdAndDelete(id);

    res.status(200).json({
      error: 0,
      response: "Medico eliminado",
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
  getMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
};
