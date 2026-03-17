 'use strict';

 const express = require('express');
 const mainController = require('../controllers/main');
 const studentController = require('../controllers/student');
  const apiKeyAuth = require('../middleware/apiKeyAuth');

 const router = express.Router();

// main
router.get('/', mainController.index);

router.use('/student', apiKeyAuth);
router.use('/students', apiKeyAuth);

// students
router.get('/students', studentController.list);
router.get('/student/:student_id', studentController.before, studentController.show);
router.get('/student/:student_id/edit', studentController.before, studentController.edit);

router.post('/student', studentController.create);

router.put('/student/:student_id', studentController.before, studentController.update);
router.patch('/student/:student_id', studentController.before, studentController.patch);

router.delete('/student/:student_id', studentController.before, studentController.delete);

module.exports = router;

