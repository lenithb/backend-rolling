const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo conectado");
  } catch (error) {
    console.error("error al conectar con mongo:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
