const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:4200", credentials: true }));
app.use(express.json());

// Routes
const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// DB & Server Init
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
