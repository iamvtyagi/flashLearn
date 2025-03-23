import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectedWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    const verifyAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        });

        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.error('Auth error:', error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []); // Only run on mount

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default UserProtectedWrapper;