const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB) {
      return res.status(404).json({
        error: 1,
        response: "Email no encontrado",
      });
    }

    const valiPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!valiPassword) {
      return res.status(404).json({
        error: 1,
        response: "Contraseña no valida",
      });
    }

    // Generar Token
    const token = await generarJWT(usuarioDB.id);

    res.status(200).json({
      error: 0,
      response: token,
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
  login,
};
