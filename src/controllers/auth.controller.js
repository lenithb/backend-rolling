const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validacion basica de campos
    if (!username || !email || !password) {
      return res.status(400).json({ message: "faltan datos obligatorios" });
    }

    // chequeo si el email ya existe
    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(409).json({ message: "el email ya esta registrado" });
    }

    // hasheo la password antes de guardarla
    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hash });

    res.status(201).json({ message: "usuario registrado con exito" });
  } catch (error) {
    res.status(500).json({ message: "error en el servidor" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email y password son obligatorios" });
    }

    const user = await User.findOne({ email });
    // mismo mensaje si falla el email o la password, asi no damos pistas
    if (!user) {
      return res.status(401).json({ message: "credenciales invalidas" });
    }

    const coincide = await bcrypt.compare(password, user.password);
    if (!coincide) {
      return res.status(401).json({ message: "credenciales invalidas" });
    }

    // genero el token con el id del usuario
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "login exitoso", token });
  } catch (error) {
    res.status(500).json({ message: "error en el servidor" });
  }
};

module.exports = { register, login };
