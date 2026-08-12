const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const initializeDatabase = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      done BOOLEAN NOT NULL DEFAULT FALSE
    );
  `);

  const result = await pool.query("SELECT COUNT(*) FROM tasks");

  if (Number(result.rows[0].count) === 0) {
    await pool.query(`
      INSERT INTO tasks (title, done)
      VALUES
        ('Learn Node.js', FALSE),
        ('Learn Express', FALSE),
        ('Learn PostgreSQL', FALSE);
    `);

    console.log("✅ Sample tasks inserted.");
  }
};

module.exports = {
  pool,
  initializeDatabase,
};
