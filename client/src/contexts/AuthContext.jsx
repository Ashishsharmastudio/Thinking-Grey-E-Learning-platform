import React, { createContext, useState, useEffect, useCallback } from 'react';
import { login, verifyOtp } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const checkAuth = useCallback(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      console.log("User not authenticated");
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const handleLogin = async (email, language) => {
    try {
      const response = await login(email, language);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleVerifyOtp = async (email, otp) => {
    try {
      const response = await verifyOtp(email, otp);
      console.log('Full response from server:', response);
      if (response && response.data && response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        throw new Error('Token not received from server');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{
      token,
      isAuthenticated,
      handleLogin,
      handleVerifyOtp,
      logout,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
