'use strict';

const db = require('../db');

async function findAllStudents() {
  const [rows] = await db.query(
    'SELECT id, name, age, course FROM students'
  );
  return rows;
}

async function findStudentById(id) {
  const [rows] = await db.query(
    'SELECT id, name, age, course FROM students WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

async function updateStudent(id, name, age, course) {
  await db.query(
    'UPDATE students SET name = ?, age = ?, course = ? WHERE id = ?',
    [name, age, course, id]
  );
}

async function patchStudent(id, data) {
  const fields = [];
  const values = [];

  if (data.name !== undefined) {
    fields.push('name = ?');
    values.push(data.name);
  }

  if (data.age !== undefined) {
    fields.push('age = ?');
    values.push(data.age);
  }

  if (data.course !== undefined) {
    fields.push('course = ?');
    values.push(data.course);
  }

  if (fields.length === 0) return;

  values.push(id);

  await db.query(
    `UPDATE students SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
}

async function createStudent(name, age, course) {
  const [result] = await db.query(
    'INSERT INTO students (name, age, course) VALUES (?, ?, ?)',
    [name, age, course]
  );

  return { id: result.insertId, name, age, course };
}

async function deleteStudent(id) {
  await db.query(
    'DELETE FROM students WHERE id = ?',
    [id]
  );
}

module.exports = {
  findAllStudents,
  findStudentById,
  updateStudent,
  patchStudent,
  createStudent,
  deleteStudent
};