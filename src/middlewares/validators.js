const { body, param, validationResult } = require("express-validator");

// corta con 400 si alguna validación fallo
const manejarErrores = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      message: "error de validacion",
      errores: errores.array().map((e) => ({ campo: e.path, mensaje: e.msg })),
    });
  }
  next();
};

const esBooleano = (valor) => {
  if (typeof valor !== "boolean") throw new Error("debe ser booleano (true o false)");
  return true;
};

const validarId = [
  param("id").isMongoId().withMessage("el id no es valido"),
  manejarErrores,
];

const validarCategoria = [
  body("nombre")
    .exists().withMessage("el nombre es obligatorio").bail()
    .isString().withMessage("el nombre debe ser texto").bail()
    .trim()
    .isLength({ min: 3, max: 50 }).withMessage("el nombre debe tener entre 3 y 50 caracteres"),
  body("estado").optional().custom(esBooleano).withMessage("el estado debe ser booleano"),
  manejarErrores,
];

const validarTarea = [
  body("titulo")
    .exists().withMessage("el titulo es obligatorio").bail()
    .isString().withMessage("el titulo debe ser texto").bail()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage("el titulo debe tener entre 1 y 100 caracteres"),
  body("descripcion").optional().isString().withMessage("la descripcion debe ser texto"),
  body("fechaEntrega").optional().isISO8601().withMessage("la fecha debe tener formato ISO (2026-12-31)"),
  body("completada").optional().custom(esBooleano).withMessage("completada debe ser booleano"),
  body("categoria").optional().isMongoId().withMessage("la categoria debe ser un ObjectId valido"),
  manejarErrores,
];

module.exports = { validarId, validarCategoria, validarTarea };
