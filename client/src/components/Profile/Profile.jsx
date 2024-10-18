import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-500 px-6 py-4">
          <h2 className="text-3xl font-bold text-white">User Profile</h2>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Email</h3>
            <p className="text-gray-600">{profile.email}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Language</h3>
            <p className="text-gray-600">{profile.language}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Account Created</h3>
            <p className="text-gray-600">{new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
