const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // unique crea un indice para evitar nombres repetidos
    nombre: { type: String, required: true, unique: true, trim: true },
    estado: { type: Boolean, default: true },
    // dueño del producto, sale del token
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    precio: { type: Number, default: 0 },
    // categoria opcional, si viene tiene que existir
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    descripcion: { type: String, trim: true },
    disponible: { type: Boolean, default: true },
    img: { type: String, default: "https://placehold.co/400x400?text=producto" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
