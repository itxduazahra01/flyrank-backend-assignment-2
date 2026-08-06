const Database = require("better-sqlite3");

const db = new Database("tasks.db");

// Create tasks table
db.exec(`
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
);
`);

// Seed database if empty
const rowCount = db.prepare("SELECT COUNT(*) AS count FROM tasks").get();

if (rowCount.count === 0) {
  const insert = db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)");

  insert.run("Learn Node.js", 0);
  insert.run("Learn Express", 0);
  insert.run("Learn SQLite", 0);

  console.log("✅ Sample tasks inserted.");
}

module.exports = db;
