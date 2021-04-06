const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      error: 1,
      response: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 1,
      response: "Token no valido",
    });
  }
};

const validarAdminRole = async (req, res, next) => {
  const uid = req.uid;
  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        error: 1,
        response: "Usuario no existe",
      });
    }

    if (usuarioDB.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        error: 1,
        response: "No tiene privilegios para hacer eso",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 1,
      response: "Hable con el admistrador",
    });
  }
};

const validarAdminRole_o_MismoUsuario = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        error: 1,
        response: "Usuario no existe",
      });
    }

    if (usuarioDB.role === "ADMIN_ROLE" || uid === id) {
      next();
    } else {
      return res.status(403).json({
        error: 1,
        response: "No tiene privilegios para hacer eso",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 1,
      response: "Hable con el admistrador",
    });
  }
};

module.exports = {
  validarJWT,
  validarAdminRole,
  validarAdminRole_o_MismoUsuario,
};
