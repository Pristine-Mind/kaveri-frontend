import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';
import React, { useEffect, ReactNode, useContext } from 'react';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface AxiosInterceptorProps {
  children: ReactNode;
}

export const AxiosInterceptor: React.FC<AxiosInterceptorProps> = ({ children }) => {
  const { token, setToken, logout } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response) {
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
              const refreshToken = localStorage.getItem('refreshToken');
              if (!refreshToken) {
                throw new Error('No refresh token available.');
              }

              const response = await axiosInstance.post('token/refresh/', {
                refresh: refreshToken,
              });

              const newAccessToken = response.data.access;
              setToken(newAccessToken);
              axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
              originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

              return axiosInstance(originalRequest);
            } catch (refreshError: any) {
              toast.error('Session expired. Please log in again.');
              logout();
              return Promise.reject(refreshError);
            }
          } else if (error.response.status === 403) {
            toast.error('Forbidden. You do not have access.');
          } else if (error.response.status >= 500) {
            toast.error('Server error. Please try again later.');
          } else {
            toast.error(error.response.data.detail || 'An error occurred. Please try again.');
          }
        } else {
          toast.error('Network error. Please try again.');
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token, setToken, logout]);

  return <>{children}</>;
};

export default axiosInstance;
