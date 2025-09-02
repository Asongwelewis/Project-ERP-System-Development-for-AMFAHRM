import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api/axiosConfig';

const JwtAuthContext = createContext();

export function JwtAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await api.get('/auth/me/');
          setUser(response.data);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [api]); // Added api to dependency array

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login/', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      setError(null);
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 
                         error.response?.data?.message || 
                         'Login failed. Please check your credentials and try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register/', userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      setError(null);
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 
                         error.response?.data?.message || 
                         'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Optionally call backend logout endpoint if you have one
  };

  return (
    <JwtAuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        api, // Export the configured axios instance
      }}
    >
      {children}
    </JwtAuthContext.Provider>
  );
}

export const useJwtAuth = () => {
  const context = useContext(JwtAuthContext);
  if (context === undefined) {
    throw new Error('useJwtAuth must be used within a JwtAuthProvider');
  }
  return context;
};
