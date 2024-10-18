import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

const CourseDetails = () => {
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const userId = user ? user._id : null;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await api.get(`/courses/${id}`);
        setCourse(courseResponse.data);

        const quizResponse = await api.get(`/quizzes/${id}`);
        setQuiz(quizResponse.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleVideoComplete = () => {
    if (currentVideoIndex < course.videos.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handleQuizAnswer = (questionIndex, answer) => {
    setQuizAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = answer;
      return updatedAnswers;
    });
  };

  const handleQuizSubmit = async () => {
    try {
      const response = await api.post('/quizzes/submit', {
        userId: userId,
        courseId: id,
        answers: quizAnswers,
      });
      setQuizScore(response.data.score);
      setQuizSubmitted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-red-600">Course not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h2>
          <p className="text-gray-600 mb-6">{course.description}</p>

          {!showQuiz ? (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                {course.videos[currentVideoIndex].title}
              </h3>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <video
                  src={course.videos[currentVideoIndex].url}
                  controls
                  onEnded={handleVideoComplete}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${((currentVideoIndex + 1) / course.videos.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Video {currentVideoIndex + 1} of {course.videos.length}
              </p>
            </div>
          ) : (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
              <h3 className="text-2xl font-semibold text-yellow-700 mb-4">Course Quiz</h3>
              {!quizSubmitted && quiz ? (
                <>
                  {quiz.questions.map((question, index) => (
                    <div key={question._id} className="mb-6">
                      <p className="font-semibold mb-2">{index + 1}. {question.text}</p>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="mb-2">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio"
                              name={question._id}
                              value={`Option ${String.fromCharCode(65 + optionIndex)}`}
                              onChange={() => handleQuizAnswer(index, `Option ${String.fromCharCode(65 + optionIndex)}`)}
                            />
                            <span className="ml-2">{option}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
                  <button
                    onClick={handleQuizSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit Quiz
                  </button>
                </>
              ) : quizSubmitted ? (
                <div className="text-center">
                  <p className="text-green-600 font-semibold text-xl mb-4">
                    Congratulations! You have completed the course.
                  </p>
                  <p className="text-blue-600 font-bold text-2xl">
                    Your Score: {quizScore} / {quiz.questions.length}
                  </p>
                </div>
              ) : (
                <p className="text-red-500">No quiz available for this course.</p>
              )}
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Course Videos</h3>
            <div className="space-y-4">
              {course.videos.map((video, index) => (
                <div
                  key={video._id}
                  className={`p-4 rounded-md cursor-pointer transition duration-300 ${
                    index === currentVideoIndex ? 'bg-blue-100 border-l-4 border-blue-500' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => !showQuiz && setCurrentVideoIndex(index)}
                >
                  <h4 className="text-lg font-medium text-gray-800 mb-1">
                    {video.order}. {video.title}
                  </h4>
                  <p className="text-sm text-gray-500">Video ID: {video.videoId}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>Created: {new Date(course.createdAt).toLocaleString()}</p>
            <p>Last Updated: {new Date(course.updatedAt).toLocaleString()}</p>
            <p>Course ID: {course._id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
