const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSingIn = async (req, res = response) => {
  const googleToken = req.body.token;

  try {
    const { name, email, picture } = await googleVerify(googleToken);

    const usuarioDB = await Usuario.findOne({ email });
    let usuario;
    if (!usuarioDB) {
      // Si no existe el usuario
      usuario = new Usuario({
        nombre: name,
        email: email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      // Existe usuario
      usuario = usuarioDB;
      usuario.google = true;
    }

    // Guardar em base de datos
    await usuario.save();
    // Generar Token
    const token = await generarJWT(usuario.id);

    res.status(200).json({
      error: 0,
      response: token,
    });
  } catch (error) {
    res.status(401).json({
      error: 1,
      response: "Token no es correcto",
    });
  }
};

module.exports = {
  login,
  googleSingIn,
};
