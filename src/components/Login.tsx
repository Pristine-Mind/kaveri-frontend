import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const { setToken, setUserId } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/token/`, {
        email,
        password,
      });
    
      if (response.status === 200) {
        const { access, refresh, user_id, is_verified } = response.data;    
        if (is_verified === false) {
          toast.error('You are not verified yet');
          return;
        }
    
        setToken(access);
        setUserId(user_id);
        localStorage.setItem('refreshToken', refresh);
        toast.success('Logged in successfully!');
        window.location.href = '/';
      }
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password. Please try again.');
        toast.error('Invalid email or password.');
      } else if (err.response && err.response.data) {
        setError(err.response.data.detail || 'An error occurred. Please try again later.');
        toast.error(err.response.data.detail || 'An error occurred. Please try again later.');
      } else {
        setError('An error occurred. Please try again later.');
        toast.error('An error occurred. Please try again later.');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/300984598_1674044502970227_7362308765199212657_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=gOmsX5v19CEQ7kNvgE4p2db&_nc_oc=AdgpALYse5BbwJyJ3WnthBBkc7Bb4pcBhnpC2NDnISqtrGbjdCA1hkFFRiSEUOMWQfTkzv2GYhntvslhtn0f85yU&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&_nc_gid=AHEk5QWEvpNQ3RavNtNhbx1&oh=00_AYA16RVM_MduxtpLgw606W-gVM4XNr1ozB2X3omjjn_jqQ&oe=677D57CD)', // Replace with your background image URL
      }}
    >
      <div className="w-full max-w-sm bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 mt-4 text-white font-semibold rounded-md ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none transition duration-200`}
            >
              {isSubmitting ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-blue-600 hover:underline text-sm">Forgot your password?</a>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
