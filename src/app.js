const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

const app = express();

// middlewares, express.json tiene que ir antes de las rutas
app.use(cors());
app.use(express.json());

// no otro día hago la ruta de tareas
app.use("/api/auth", authRoutes);

module.exports = app;
