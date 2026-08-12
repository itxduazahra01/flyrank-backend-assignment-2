console.log("✅ taskRoutes.js loaded");

const express = require("express");
const router = express.Router();

const taskService = require("../services/taskService");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

// GET task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await taskService.getTaskById(Number(req.params.id));

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch task",
    });
  }
});

// CREATE task
router.post("/", async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// UPDATE task
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await taskService.updateTask(
      Number(req.params.id),
      req.body,
    );

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

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await taskService.deleteTask(Number(req.params.id));

    if (!deleted) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

module.exports = router;
