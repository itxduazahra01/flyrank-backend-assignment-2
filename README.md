# Week 3 - SQLite CRUD API

## Project Overview

This project is a Task Management REST API built with Node.js, Express.js, and SQLite. It demonstrates complete CRUD (Create, Read, Update, Delete) operations using a SQLite database instead of in-memory storage.

## Technologies Used

- Node.js
- Express.js
- SQLite
- better-sqlite3

## Project Structure

```
Week 1/
│
├── config/
│   └── sqlite.js
│
├── repositories/
│   └── sqliteTaskRepository.js
│
├── services/
│   └── taskService.js
│
├── routes/
│   └── taskRoutes.js
│
├── tasks.db
├── server.js
├── package.json
└── README.md
```

## Features

- View all tasks
- View a task by ID
- Create a new task
- Update an existing task
- Delete a task
- Automatic database creation
- Automatic table creation
- Automatic seed data insertion

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create a task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

## How to Run

1. Install dependencies

```bash
npm install
```

2. Start the server

```bash
node server.js
```

3. Open Postman

```
http://localhost:3000/tasks
```

## SQLite Database

The SQLite database file is:

```
tasks.db
```

It is automatically created when the project starts.

If the database is empty, three sample tasks are inserted automatically.

## SQL Queries Practiced

```sql
SELECT * FROM tasks;

SELECT * FROM tasks WHERE done = 1;

SELECT COUNT(*) FROM tasks;

UPDATE tasks
SET done = 1;

DELETE FROM tasks
WHERE done = 1;
```

### Observation

The SQL queries directly modified the SQLite database, and the changes were immediately reflected when testing the API in Postman.

