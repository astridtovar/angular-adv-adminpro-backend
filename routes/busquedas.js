// RUTA: /api/todo/:busqueda

const { Router } = require("express");

const BusquedaControl = require("./../controllers/busquedas");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/:busqueda", [validarJWT], BusquedaControl.getTodo);
router.get(
  "/coleccion/:tabla/:busqueda",
  [validarJWT],
  BusquedaControl.getDocumentosCollecion
);

module.exports = router;
