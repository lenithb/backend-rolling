const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const taskRoutes = require("./routes/task.routes");
const productRoutes = require("./routes/product.routes");

const app = express();

// middlewares, express.json tiene que ir antes de las rutas
app.use(cors());
app.use(express.json());

// task, categories y products agregadas
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
