const Task = require("../models/Task");
const Category = require("../models/Category");

const getTasks = async (req, res) => {
  try {
    // solo las tareas del usuario logueado
    const tareas = await Task.find({ usuario: req.userId }).populate("categoria", "nombre estado");
    res.json(tareas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const tarea = await Task.findOne({ _id: req.params.id, usuario: req.userId }).populate("categoria", "nombre estado");
    if (!tarea) return res.status(404).json({ message: "tarea no encontrada" });
    res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};

const createTask = async (req, res) => {
  try {
    const { titulo, descripcion, fechaEntrega, completada, categoria } = req.body;

    // si mandan categoria, tiene que existir
    if (categoria) {
      const existe = await Category.findById(categoria);
      if (!existe) return res.status(404).json({ message: "la categoria indicada no existe" });
    }

    const tarea = await Task.create({
      titulo, descripcion, fechaEntrega, completada, categoria,
      usuario: req.userId,
    });
    res.status(201).json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { titulo, descripcion, fechaEntrega, completada, categoria } = req.body;

    if (categoria) {
      const existe = await Category.findById(categoria);
      if (!existe) return res.status(404).json({ message: "la categoria indicada no existe" });
    }

    const tarea = await Task.findOneAndUpdate(
      { _id: req.params.id, usuario: req.userId },
      { titulo, descripcion, fechaEntrega, completada, categoria },
      { new: true, runValidators: true }
    );
    if (!tarea) return res.status(404).json({ message: "tarea no encontrada" });

    res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const tarea = await Task.findOneAndDelete({ _id: req.params.id, usuario: req.userId });
    if (!tarea) return res.status(404).json({ message: "tarea no encontrada" });
    res.json({ message: "tarea eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
