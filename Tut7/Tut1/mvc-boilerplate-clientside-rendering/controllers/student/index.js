const students = require('../models/student.model');

// Add student
exports.createStudent = (req, res) => {
  const { name, age, course } = req.body;

  const student = {
    id: Date.now().toString(),
    name,
    age,
    course
  };

  students.push(student);

  res.status(201).json({
    success: true,
    data: student
  });
};

// Get all students
exports.getStudents = (req, res) => {
  res.json({
    success: true,
    data: students
  });
};

// Get single student
exports.getStudent = (req, res) => {
  const student = students.find(s => s.id === req.params.id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  res.json({
    success: true,
    data: student
  });
};

// Full update
exports.updateStudent = (req, res) => {
  const student = students.find(s => s.id === req.params.id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const { name, age, course } = req.body;

  student.name = name;
  student.age = age;
  student.course = course;

  res.json({
    success: true,
    data: student
  });
};

// Partial update
exports.patchStudent = (req, res) => {
  const student = students.find(s => s.id === req.params.id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  Object.assign(student, req.body);

  res.json({
    success: true,
    data: student
  });
};

// Delete student
exports.deleteStudent = (req, res) => {
  const index = students.findIndex(s => s.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const deleted = students.splice(index, 1);

  res.json({
    success: true,
    data: deleted[0]
  });
};