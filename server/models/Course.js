const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videos: [{
    videoId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
