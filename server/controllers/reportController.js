const UserProgress = require('../models/UserProgress');

exports.generateReport = async (req, res) => {
  try {
    console.log('Authenticated user ID:', req.user);
    const report = await UserProgress.find({ userId: req.user})
      .populate('courseId', 'title')
      .select('courseId quizStatus quizScore completionDate');
    console.log('Generated report:', JSON.stringify(report, null, 2));
    res.status(200).json(report);
  } catch (error) {
    console.error('Error in generateReport:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
