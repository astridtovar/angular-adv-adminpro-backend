const jwt = require("jsonwebtoken");

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

module.exports = {
  validarJWT,
};
