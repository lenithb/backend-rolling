require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

// primero conecto la base y despues levanto el server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server corriendo en el puerto ${PORT}`);
  });
});
