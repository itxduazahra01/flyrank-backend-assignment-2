# Task Management API

A REST API for managing tasks built with Node.js and Express.js. The project uses PostgreSQL for persistent storage, Redis for caching, and Docker Compose to run the API, PostgreSQL, and Redis together.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Redis
- Docker
- Docker Compose

## Features

- Get all tasks
- Get a task by ID
- Create a task
- Update a task
- Delete a task
- PostgreSQL persistent storage
- Redis caching for GET requests
- Redis cache invalidation after create, update, and delete
- Docker Compose setup
- PostgreSQL and Redis healthchecks

## API Endpoints

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| GET    | `/tasks`     | Get all tasks    |
| GET    | `/tasks/:id` | Get a task by ID |
| POST   | `/tasks`     | Create a task    |
| PUT    | `/tasks/:id` | Update a task    |
| DELETE | `/tasks/:id` | Delete a task    |

## Project Structure

```text
Week 3/
├── config/
│   ├── postgres.js
│   └── redis.js
├── repositories/
│   └── postgresTaskRepository.js
├── routes/
│   └── taskRoutes.js
├── services/
│   └── taskService.js
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── compose.yaml
├── package.json
├── package-lock.json
├── server.js
└── README.md
```
