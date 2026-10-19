const categoryRoutes = require("./routes/category.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

// middlewares, express.json tiene que ir antes de las rutas
app.use(cors());
app.use(express.json());

// task y categories agregadas
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tasks", taskRoutes);
