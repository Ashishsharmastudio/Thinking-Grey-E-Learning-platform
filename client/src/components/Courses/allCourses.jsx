import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourses = async () => {
      if (isAuthenticated) {
        try {
          const response = await api.get('/courses');
          setCourses(response.data);
          console.log('Fetched courses:', response.data);
        }  catch (error) {
          console.error('Error fetching courses in courselist.jsx:', error);
          if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            navigate('/login');
          }
        }
      }
    };

    fetchCourses();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div>Please log in to view courses.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600">{course.description}</p>
              <p className="text-sm text-gray-500 mt-2">Number of videos: {course.videos.length}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
