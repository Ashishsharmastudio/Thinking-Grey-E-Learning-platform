const Quiz = require("../models/Quiz");
const UserProgress = require("../models/UserProgress");

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ courseId: req.params.courseId });
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.submitQuiz = async (req, res) => {
  const { userId, courseId, answers } = req.body;
  try {
    const quiz = await Quiz.findOne({ courseId });
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score++;
      }
    });

    const result = await UserProgress.findOneAndUpdate(
      { userId, courseId },
      { quizStatus: "Completed", quizScore: score, completionDate: new Date() },
      { new: true, upsert: true }
    );
    console.log('Updated UserProgress:', result);

    res.status(200).json({ score });
  } catch (error) {
    console.error('Error in submitQuiz:', error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.addQuiz = async (req, res) => {
  try {
    const { courseId, questions } = req.body;
    const newQuiz = new Quiz({
      courseId,
      questions,
    });
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
