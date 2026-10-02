const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const logger = require("./middleware/logger");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Management REST API is running"
  });
});

app.use("/students", studentRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Route Not Found"
  });
});

app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(500).json({
    error: "Internal Server Error"
  });
});

app.listen(PORT, () => {
  console.log(`Student Management REST API running on http://localhost:${PORT}`);
  console.log("GET    /students");
  console.log("GET    /students/:id");
  console.log("POST   /students");
  console.log("PUT    /students/:id");
  console.log("DELETE /students/:id");
});
