import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import CourseList from './components/Home/CourseList';
import CourseDetails from './components/Courses/CourseDetails';
import AllCourses from './components/Courses/allCourses';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import Reports from './components/Reports/Reports';
import PrivateRoute from './routes/PrivateRoute';
import './styles/index.css';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><CourseList /></PrivateRoute>} />
          <Route path="/courses" element={<PrivateRoute><AllCourses /></PrivateRoute>} />
          <Route path="/course/:id" element={<PrivateRoute><CourseDetails /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
