const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

const app = express();

// middlewares, express.json tiene que ir antes de las rutas
app.use(cors());
app.use(express.json());

// despues agrego categories y tasks
app.use("/api/auth", authRoutes);

module.exports = app;
