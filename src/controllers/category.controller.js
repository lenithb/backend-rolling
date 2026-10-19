const Category = require("../models/Category");

const getCategories = async (req, res) => {
  try {
    const categorias = await Category.find();
    res.json(categorias);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoria = await Category.findById(req.params.id);
    if (!categoria) return res.status(404).json({ message: "categoria no encontrada" });
    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};

const createCategory = async (req, res) => {
  try {
    const { nombre, estado } = req.body;

    const existe = await Category.findOne({ nombre });
    if (existe) return res.status(409).json({ message: "ya existe una categoria con ese nombre" });

    const categoria = await Category.create({ nombre, estado });
    res.status(201).json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { nombre, estado } = req.body;

    // chequeo duplicado ignorando la propia categoria
    const duplicada = await Category.findOne({ nombre, _id: { $ne: req.params.id } });
    if (duplicada) return res.status(409).json({ message: "ya existe una categoria con ese nombre" });

    const categoria = await Category.findByIdAndUpdate(
      req.params.id,
      { nombre, estado },
      { new: true, runValidators: true }
    );
    if (!categoria) return res.status(404).json({ message: "categoria no encontrada" });

    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoria = await Category.findByIdAndDelete(req.params.id);
    if (!categoria) return res.status(404).json({ message: "categoria no encontrada" });
    res.json({ message: "categoria eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
