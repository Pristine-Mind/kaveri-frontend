import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import OrdersPage from './OrdersPage';

interface UserProfile {
  username: string;
  email: string;
}

const Profile: React.FC = () => {
  const { token } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
          toast.error('Failed to load profile.');
          setIsLoading(false);
        });
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-lg text-red-600">No user data available. Please check your login status.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4 pt-40">
      {/* Profile Info Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Profile</h2>
        <div className="space-y-4">
          {/* Username */}
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-gray-700">Username</label>
            <p className="mt-1 text-lg text-gray-900">{user.username}</p>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <p className="mt-1 text-lg text-gray-900">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="w-full max-w-7xl">
        {/* Error Boundary for OrdersPage */}
        {hasError ? (
          <div className="bg-red-100 p-4 rounded-lg mb-8">
            <p className="text-red-600">Failed to load orders. Please try again later.</p>
          </div>
        ) : (
          <OrdersPage setHasError={setHasError} />
        )}
      </div>
    </div>
  );
};

export default Profile;
