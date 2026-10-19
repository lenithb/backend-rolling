const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true, maxlength: 100 },
    descripcion: { type: String, trim: true },
    fechaEntrega: { type: Date },
    completada: { type: Boolean, default: false },
    // categoria opcional, si viene tiene que existir
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    // dueño de la tarea, sale del token
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
