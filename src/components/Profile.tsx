import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

interface UserProfile {
  username: string;
  email: string;
}

const Profile: React.FC = () => {
  const { token } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/profile/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to load profile.');
        setIsLoading(false);
      });
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No user data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Username</label>
            <p className="mt-1 text-gray-900">{user.username}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
