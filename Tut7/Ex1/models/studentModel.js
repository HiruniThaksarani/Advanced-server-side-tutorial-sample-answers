'use strict';

const studentDao = require('../dao/studentDao');

async function findAllStudents() {
  return studentDao.findAllStudents();
}

async function findStudentById(id) {
  return studentDao.findStudentById(id);
}

async function createStudent(name, age, course) {
  return studentDao.createStudent(name, age, course);
}

async function updateStudent(id, name, age, course) {
  return studentDao.updateStudent(id, name, age, course);
}

async function patchStudent(id, data) {
  return studentDao.patchStudent(id, data);
}

async function deleteStudent(id) {
  return studentDao.deleteStudent(id);
}

module.exports = {
  findAllStudents,
  findStudentById,
  createStudent,
  updateStudent,
  patchStudent,
  deleteStudent
};