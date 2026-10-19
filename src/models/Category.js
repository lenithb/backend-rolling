const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    // unique crea un indice para evitar nombres repetidos
    nombre: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 50 },
    estado: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
