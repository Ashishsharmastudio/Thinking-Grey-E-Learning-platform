const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  questions: [{
    text: String,
    options: [String],
    correctAnswer: String,
  }],
});

module.exports = mongoose.model('Quiz', QuizSchema);
