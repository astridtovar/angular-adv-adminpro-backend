// RUTA: /api/hospitales

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("./../middlewares/validar-campos");

const HospitalControl = require("./../controllers/hospitales");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", HospitalControl.getHospitales);
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es necesario.").not().isEmpty(),
    validarCampos,
  ],
  HospitalControl.crearHospital
);
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre del hospital es necesario.").not().isEmpty(),
    validarCampos,
  ],
  HospitalControl.actualizarHospital
);
router.delete("/:id", validarJWT, HospitalControl.eliminarHospital);

module.exports = router;
