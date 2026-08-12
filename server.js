require("dotenv").config();

const express = require("express");

const { initializeDatabase } = require("./config/postgres");
const { connectRedis } = require("./config/redis");

const app = express();

app.use(express.json());

const PORT = 3000;

const taskRoutes = require("./routes/taskRoutes");

app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Task Management API",
  });
});

console.log("Task Routes Loaded");
console.log("Server starting...");

const startServer = async () => {
  try {
    await initializeDatabase();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Application startup failed:", error);
  }
};

startServer();
