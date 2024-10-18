const express = require('express');
const router = express.Router();
const { getQuiz, submitQuiz, addQuiz } = require('../controllers/quizController');
const auth = require('../middleware/auth');

router.get('/:courseId', auth, getQuiz);
router.post('/submit', auth, submitQuiz);
router.post('/add', auth, addQuiz);

module.exports = router;
