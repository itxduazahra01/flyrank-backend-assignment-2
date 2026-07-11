const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Hello from my first backend!",
  });
});

app.get("/about", (req, res) => {
  res.json({
    name: "Dua Zahra",
    role: "Computer Science Student",
    internship: "FlyRank AI Backend Intern",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
