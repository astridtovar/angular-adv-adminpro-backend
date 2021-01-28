// RUTA: /api/usuarios

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("./../middlewares/validar-campos");

const UsuarioControl = require("./../controllers/usuarios");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, UsuarioControl.getUsuarios);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio.").not().isEmpty(),
    check("password", "La contraseña es obligatoria.").not().isEmpty(),
    check("email", "El email es obligatorio.").isEmail(),
    validarCampos,
  ],
  UsuarioControl.crearUsuario
);
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio.").not().isEmpty(),
    check("role", "El role es obligatorio.").not().isEmpty(),
    check("email", "El email es obligatorio.").isEmail(),
    validarCampos,
  ],
  UsuarioControl.actualizarUsuario
);
router.delete("/:id", validarJWT, UsuarioControl.eliminarUsuario);

module.exports = router;
