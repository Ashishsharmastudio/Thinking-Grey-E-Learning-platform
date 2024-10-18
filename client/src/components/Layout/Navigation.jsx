import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Thinkgray E-learning</div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/courses" className="text-white hover:text-gray-300">Courses</Link>
          <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
          <Link to="/reports" className="text-white hover:text-gray-300">Reports</Link>
          {isAuthenticated && (
            <button onClick={logout} className="text-white hover:text-gray-300">Logout</button>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2">
          <Link to="/" className="block text-white py-2 px-4 hover:bg-gray-700">Home</Link>
          <Link to="/courses" className="block text-white py-2 px-4 hover:bg-gray-700">Courses</Link>
          <Link to="/profile" className="block text-white py-2 px-4 hover:bg-gray-700">Profile</Link>
          <Link to="/reports" className="block text-white py-2 px-4 hover:bg-gray-700">Reports</Link>
          {isAuthenticated && (
            <button onClick={logout} className="block w-full text-left text-white py-2 px-4 hover:bg-gray-700">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
