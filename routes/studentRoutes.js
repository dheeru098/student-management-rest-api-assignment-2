const express = require("express");
const students = require("../data/students");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(students);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "Student id must be a positive integer" });
  }

  const student = students.find((item) => item.id === id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  return res.status(200).json(student);
});

router.post("/", (req, res) => {
  const { name, course } = req.body || {};

  if (typeof name !== "string" || name.trim() === "" ||
      typeof course !== "string" || course.trim() === "") {
    return res.status(400).json({ error: "name and course are required" });
  }

  const nextId = students.length === 0
    ? 1
    : Math.max(...students.map((student) => student.id)) + 1;

  const newStudent = {
    id: nextId,
    name: name.trim(),
    course: course.trim()
  };

  students.push(newStudent);
  return res.status(201).json(newStudent);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "Student id must be a positive integer" });
  }

  const { name, course } = req.body || {};

  if (typeof name !== "string" || name.trim() === "" ||
      typeof course !== "string" || course.trim() === "") {
    return res.status(400).json({ error: "name and course are required" });
  }

  const student = students.find((item) => item.id === id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  student.name = name.trim();
  student.course = course.trim();

  return res.status(200).json(student);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: "Student id must be a positive integer" });
  }

  const index = students.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1)[0];

  return res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

module.exports = router;
