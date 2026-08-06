console.log("✅ taskRoutes.js loaded");

const express = require("express");
const router = express.Router();

const taskService = require("../services/taskService");

console.log("✅ Registering PUT /:id route");

// GET all tasks
router.get("/", (req, res) => {
  const tasks = taskService.getAllTasks();
  res.json(tasks);
});

// GET task by ID
router.get("/:id", (req, res) => {
  const task = taskService.getTaskById(Number(req.params.id));

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.json(task);
});

// CREATE task
router.post("/", (req, res) => {
  try {
    const task = taskService.createTask(req.body);

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.put("/:id", (req, res) => {
  console.log("Request Body:", req.body);

  try {
    const updatedTask = taskService.updateTask(Number(req.params.id), req.body);

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: error.message,
    });
  }
});

router.delete("/:id", (req, res) => {
  const deleted = taskService.deleteTask(Number(req.params.id));

  if (!deleted) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(204).send();
});

module.exports = router;
