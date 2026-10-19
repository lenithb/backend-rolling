const { Router } = require("express");
const ctrl = require("../controllers/category.controller");
const { validarId, validarCategoria } = require("../middlewares/validators");

const router = Router();

router.get("/", ctrl.getCategories);
router.get("/:id", validarId, ctrl.getCategoryById);
router.post("/", validarCategoria, ctrl.createCategory);
router.put("/:id", validarId, validarCategoria, ctrl.updateCategory);
router.delete("/:id", validarId, ctrl.deleteCategory);

module.exports = router;
