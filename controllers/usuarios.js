const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("./../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res = response) => {
  const usuarios = await Usuario.find({}, "nombre email role google");
  res.status(200).json({
    error: 0,
    response: usuarios,
  });
};

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        error: 1,
        response: "El correo ya esta registrado.",
      });
    }

    const usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    const token = await generarJWT(usuario.id);

    res.status(200).json({
      error: 0,
      response: { usuario, token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 1,
      response: "Error inesperado",
    });
  }
};

const actualizarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      res.status(404).json({
        error: 0,
        response: "No existe un usuario por ese id",
      });
    }

    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          error: 0,
          response: "Ya existe un usuario con ese email",
        });
      }
    }

    campos.email = email;

    const usuaroActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.status(200).json({
      error: 0,
      response: usuaroActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 1,
      response: "Error inesperado",
    });
  }
};

const eliminarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      res.status(404).json({
        error: 0,
        response: "No existe un usuario por ese id",
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.status(200).json({
      error: 0,
      response: "Usuario eliminado",
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
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
