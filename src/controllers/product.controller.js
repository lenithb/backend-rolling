const Product = require("../models/Product");
const Category = require("../models/Category");

const obtenerProductos = async (req, res) => {
  try {
    // traigo hasta 5 productos activos y el total de todos los activos
    const [productos, total] = await Promise.all([
      Product.find({ estado: true })
        .limit(5)
        .populate("usuario", "username email")
        .populate("categoria", "nombre"),
      Product.countDocuments({ estado: true }),
    ]);

    res.json({ total, productos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error en el servidor" });
  }
};

const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, categoria, descripcion, img } = req.body;

    // el nombre no se puede repetir
    const existe = await Product.findOne({ nombre });
    if (existe) return res.status(409).json({ message: "ya existe un producto con ese nombre" });

    // si mandan categoria, tiene que existir
    const existeCategoria = await Category.findById(categoria);
    if (!existeCategoria) return res.status(404).json({ message: "la categoria indicada no existe" });

    const producto = await Product.create({
      nombre,
      precio,
      categoria,
      descripcion,
      img,
      usuario: req.userId,
    });

    res.status(201).json(producto);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "ya existe un producto con ese nombre" });
    }
    res.status(500).json({ message: "error en el servidor" });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    // el usuario y el id no se pueden tocar
    delete data.usuario;
    delete data._id;

    // si viene nombre, tiene que estar libre
    if (data.nombre) {
      const duplicado = await Product.findOne({ nombre: data.nombre, _id: { $ne: id } });
      if (duplicado) return res.status(409).json({ message: "ya existe un producto con ese nombre" });
    }

    // si viene categoria, tiene que existir
    if (data.categoria) {
      const existe = await Category.findById(data.categoria);
      if (!existe) return res.status(404).json({ message: "la categoria indicada no existe" });
    }

    const producto = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!producto) return res.status(404).json({ message: "producto no encontrado" });

    res.json(producto);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "ya existe un producto con ese nombre" });
    }
    res.status(500).json({ message: "error en el servidor" });
  }
};

const borrarProducto = async (req, res) => {
  try {
    // el borrado es logico, el producto queda con estado false
    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      { estado: false },
      { new: true }
    );
    if (!producto) return res.status(404).json({ message: "producto no encontrado" });

    res.json({ message: "producto eliminado", producto });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "ya existe un producto con ese nombre" });
    }
    res.status(500).json({ message: "error en el servidor" });
  }
};

module.exports = { obtenerProductos, crearProducto, actualizarProducto, borrarProducto };
