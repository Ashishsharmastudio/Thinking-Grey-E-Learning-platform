import api from './api';

export const login = (email, language) => {
  return api.post('/auth/login', { email, language });
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await api.post('/auth/verify-otp', { email, otp });
    console.log('API response from  verifyOtp/auth,jsx:', response);
    return response;
  } catch (error) {
    console.error('Error in verifyOtp:', error);
    throw error;
  }
};




















// import api from './api';

// export const login = async (email) => {
//   const response = await api.post('/auth/login', { email });
//   return response.data;
// };

// export const verifyOTP = async (email, otp) => {
//   const response = await api.post('/auth/verify', { email, otp });
//   return response.data;
// };





















// import axios from 'axios';

// const API_URL = 'https://api.example.com';

// export const login = async (email, password) => {
//   const response = await axios.post(`${API_URL}/login`, { email, password });
//   return response.data;
// };

// export const register = async (userData) => {
//   const response = await axios.post(`${API_URL}/register`, userData);
//   return response.data;
// };

// // Add more authentication-related functions as needed
