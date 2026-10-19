const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const header = req.headers.authorization;

  // espero el formato bearer <token>
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "token requerido" });
  }

  try {
    const token = header.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // habilito el id del usuario disponible para los controladores
    req.userId = payload.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "token invalido o expirado" });
  }
};

module.exports = auth;
