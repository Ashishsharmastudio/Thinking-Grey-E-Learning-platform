import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import CourseList from './components/Home/CourseList';
import CourseDetails from './components/Courses/CourseDetails';
import AllCourses from './components/Courses/allCourses';
// import Quiz from './components/Quiz/Quiz';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import Reports from './components/Reports/Reports';
import PrivateRoute from './routes/PrivateRoute';
import './styles/index.css';

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><CourseList /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><AllCourses /></PrivateRoute>} />
        <Route path="/course/:id" element={<PrivateRoute><CourseDetails /></PrivateRoute>} />
        {/* <Route path="/quiz/:id" element={<PrivateRoute><Quiz /></PrivateRoute>} /> */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
