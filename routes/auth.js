const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const AuthControl = require("./../controllers/auth");

const router = Router();

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  AuthControl.login
);

router.post(
  "/google",
  [check("token", "El token es obligatorio").not().isEmpty(), validarCampos],
  AuthControl.googleSingIn
);

router.get("/renew", validarJWT, AuthControl.renewToken);

module.exports = router;
