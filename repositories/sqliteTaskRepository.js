const db = require("../config/sqlite");

const getAllTasks = () => {
  const stmt = db.prepare("SELECT * FROM tasks");
  return stmt.all();
};

const getTaskById = (id) => {
  const stmt = db.prepare("SELECT * FROM tasks WHERE id = ?");
  return stmt.get(id);
};

const createTask = (title) => {
  const stmt = db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)");

  const result = stmt.run(title, 0);

  return {
    id: result.lastInsertRowid,
    title,
    done: 0,
  };
};

const updateTask = (id, title, done) => {
  const stmt = db.prepare(`
    UPDATE tasks
    SET title = ?, done = ?
    WHERE id = ?
  `);

  const result = stmt.run(title, done, id);

  if (result.changes === 0) {
    return null;
  }

  return getTaskById(id);
};

const deleteTask = (id) => {
  const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");

  const result = stmt.run(id);

  return result.changes > 0;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
