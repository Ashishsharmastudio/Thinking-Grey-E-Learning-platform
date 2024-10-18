const express = require('express');
const router = express.Router();
const { getAllCourses, getCourseDetails, updateProgress, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllCourses);
router.get('/:id', auth, getCourseDetails);
router.post('/progress', auth, updateProgress);
router.post('/', auth, createCourse);
router.put('/:id', auth, updateCourse);
router.delete('/:id', auth, deleteCourse);

module.exports = router;
