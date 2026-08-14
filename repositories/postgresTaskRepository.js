const { pool } = require("../config/postgres");
const { redisClient } = require("../config/redis");

const ALL_TASKS_KEY = "tasks:all";

const taskKey = (id) => `tasks:${id}`;

const getAllTasks = async () => {
  const cachedTasks = await redisClient.get(ALL_TASKS_KEY);

  if (cachedTasks) {
    console.log("🟢 Cache HIT: tasks:all");
    return JSON.parse(cachedTasks);
  }

  console.log("🔵 Cache MISS: tasks:all");

  const result = await pool.query("SELECT * FROM tasks");

  // Cache expires after 60 seconds
  await redisClient.set(ALL_TASKS_KEY, JSON.stringify(result.rows), { EX: 60 });

  return result.rows;
};

const getTaskById = async (id) => {
  const key = taskKey(id);

  const cachedTask = await redisClient.get(key);

  if (cachedTask) {
    console.log(`🟢 Cache HIT: ${key}`);
    return JSON.parse(cachedTask);
  }

  console.log(`🔵 Cache MISS: ${key}`);

  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);

  if (!result.rows[0]) {
    return null;
  }

  // Cache expires after 60 seconds
  await redisClient.set(key, JSON.stringify(result.rows[0]), { EX: 60 });

  return result.rows[0];
};

const createTask = async (title) => {
  const result = await pool.query(
    "INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *",
    [title, false],
  );

  await redisClient.del(ALL_TASKS_KEY);

  return result.rows[0];
};

const updateTask = async (id, title, done) => {
  const result = await pool.query(
    `UPDATE tasks
     SET title = $1, done = $2
     WHERE id = $3
     RETURNING *`,
    [title, done, id],
  );

  if (!result.rows[0]) {
    return null;
  }

  await redisClient.del(ALL_TASKS_KEY);
  await redisClient.del(taskKey(id));

  return result.rows[0];
};

const deleteTask = async (id) => {
  const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    return false;
  }

  await redisClient.del(ALL_TASKS_KEY);
  await redisClient.del(taskKey(id));

  return true;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
