const taskRepository = require("../repositories/postgresTaskRepository");

const getAllTasks = async () => {
  return await taskRepository.getAllTasks();
};

const getTaskById = async (id) => {
  return await taskRepository.getTaskById(id);
};

const createTask = async (taskData) => {
  if (!taskData.title) {
    throw new Error("Title is required");
  }

  return await taskRepository.createTask(taskData.title);
};

const updateTask = async (id, taskData) => {
  if (!taskData.title) {
    throw new Error("Title is required");
  }

  return await taskRepository.updateTask(id, taskData.title, taskData.done);
};

const deleteTask = async (id) => {
  return await taskRepository.deleteTask(id);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
