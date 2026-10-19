const { Router } = require("express");
const ctrl = require("../controllers/task.controller");
const auth = require("../middlewares/auth");
const { validarId, validarTarea } = require("../middlewares/validators");

const router = Router();

// todas las rutas de tareas piden token
router.use(auth);

router.get("/", ctrl.getTasks);
router.get("/:id", validarId, ctrl.getTaskById);
router.post("/", validarTarea, ctrl.createTask);
router.put("/:id", validarId, validarTarea, ctrl.updateTask);
router.delete("/:id", validarId, ctrl.deleteTask);

module.exports = router;
