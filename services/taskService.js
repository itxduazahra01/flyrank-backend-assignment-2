const taskRepository = require("../repositories/sqliteTaskRepository");

const getAllTasks = () => {
  return taskRepository.getAllTasks();
};

const getTaskById = (id) => {
  return taskRepository.getTaskById(id);
};

const createTask = (taskData) => {
  if (!taskData.title) {
    throw new Error("Title is required");
  }

  return taskRepository.createTask(taskData.title);
};

const updateTask = (id, taskData) => {
  if (!taskData.title) {
    throw new Error("Title is required");
  }

  return taskRepository.updateTask(id, taskData.title, taskData.done);
};

const deleteTask = (id) => {
  return taskRepository.deleteTask(id);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
