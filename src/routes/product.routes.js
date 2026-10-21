const { Router } = require("express");
const auth = require("../middlewares/auth");
const { obtenerProductos, crearProducto, actualizarProducto, borrarProducto } = require("../controllers/product.controller");
const { validarId, validarProducto, validarActualizarProducto } = require("../middlewares/validators");

const router = Router();

router.get("/", obtenerProductos);
router.post("/", auth, validarProducto, crearProducto);
router.put("/:id", validarId, validarActualizarProducto, actualizarProducto);
router.delete("/:id", validarId, borrarProducto);

module.exports = router;
