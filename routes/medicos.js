// RUTA: /api/medicos

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("./../middlewares/validar-campos");

const MedicoControl = require("./../controllers/medicos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", MedicoControl.getMedicos);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del medico es necesario").not().isEmpty(),
    check("hospital", "El hospital id debe ser valido").isMongoId(),
    validarCampos
  ],
  MedicoControl.crearMedico
);
router.put("/:id", [
  validarJWT,
    check("nombre", "El nombre del medico es necesario").not().isEmpty(),
    check("hospital", "El hospital id debe ser valido").isMongoId(),
    validarCampos
], MedicoControl.actualizarMedico);
router.delete("/:id", validarJWT, MedicoControl.eliminarMedico);
router.get("/:id", validarJWT, MedicoControl.getMedicosById);

module.exports = router;
