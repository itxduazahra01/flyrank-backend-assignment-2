const express = require("express");

// Initialize SQLite database
require("./config/sqlite");

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

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
