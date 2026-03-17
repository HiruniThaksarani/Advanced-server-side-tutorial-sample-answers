'use strict';

const studentModel = require('../../models/studentModel');

exports.before = async function (req, res, next) {
  const studentId = req.params.student_id;

  if (!studentId) return next();

  try {
    const student = await studentModel.findStudentById(studentId);
    if (!student) return next('route');
    req.student = student;
    next();
  } catch (err) {
    next(err);
  }
};

exports.list = async function (req, res, next) {
  try {
    const students = await studentModel.findAllStudents();
    res.json({ students });
  } catch (err) {
    next(err);
  }
};

exports.show = function (req, res) {
  res.json({ student: req.student });
};

exports.edit = function (req, res) {
  res.json({ student: req.student });
};

exports.create = async function (req, res, next) {
  const body = req.body;

  try {
    const student = await studentModel.createStudent(
      body.student.name,
      body.student.age,
      body.student.course
    );

    res.json({
      success: true,
      message: 'Student created!',
      student
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async function (req, res, next) {
  const body = req.body;

  try {
    await studentModel.updateStudent(
      req.student.id,
      body.student.name,
      body.student.age,
      body.student.course
    );

    req.student.name = body.student.name;
    req.student.age = body.student.age;
    req.student.course = body.student.course;

    res.json({
      success: true,
      message: 'Information updated!',
      redirect: '/student/' + req.student.id,
      student: req.student
    });
  } catch (err) {
    next(err);
  }
};

exports.patch = async function (req, res, next) {
  const body = req.body;

  try {
    await studentModel.patchStudent(req.student.id, body.student);

    Object.assign(req.student, body.student);

    res.json({
      success: true,
      message: 'Student updated!',
      student: req.student
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async function (req, res, next) {
  try {
    await studentModel.deleteStudent(req.student.id);

    res.json({
      success: true,
      message: 'Student deleted!'
    });
  } catch (err) {
    next(err);
  }
};