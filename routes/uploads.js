// RUTA: /api/uploads/:coleccion/:id

const { Router } = require("express");
const expressFileUpload = require("express-fileupload");

const UploadControl = require("./../controllers/uploads");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
router.use(expressFileUpload());

router.put("/:coleccion/:id", [validarJWT], UploadControl.fileUpload);
router.get("/:coleccion/:foto", UploadControl.getUpload);

module.exports = router;
