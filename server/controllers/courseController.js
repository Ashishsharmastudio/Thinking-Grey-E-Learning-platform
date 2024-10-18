const Course = require('../models/Course');
const UserProgress = require('../models/UserProgress');

exports.getAllCourses = async (req, res) => {
  console.log('getAllCourses function started');
  try {
    console.log('User ID from request:', req.user);
    const courses = await Course.find();
    console.log('Courses found:', courses.length);
    res.status(200).json(courses);
    console.log('Response sent successfully');
  } catch (error) {
    console.error('Error in getAllCourses:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProgress = async (req, res) => {
  const { userId, courseId, videoId } = req.body;
  try {
    let progress = await UserProgress.findOne({ userId, courseId });
    if (!progress) {
      progress = new UserProgress({ userId, courseId, completedVideos: [videoId] });
    } else {
      progress.completedVideos.push(videoId);
    }
    await progress.save();
    res.status(200).json({ message: 'Progress updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createCourse = async (req, res) => {
  console.log('createCourse function called')
  try {
    const { title, description, videos } = req.body;
    const newCourse = new Course({
      title,
      description,
      videos
    });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { title, description, videos } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, videos },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndRemove(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};