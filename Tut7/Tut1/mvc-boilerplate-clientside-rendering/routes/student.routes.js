const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student/index');
const apiKeyAuth = require('../middleware/apiKey.middleware');

// Apply middleware
router.use(apiKeyAuth);

router.post('/', studentController.createStudent);
router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudent);
router.put('/:id', studentController.updateStudent);
router.patch('/:id', studentController.patchStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;