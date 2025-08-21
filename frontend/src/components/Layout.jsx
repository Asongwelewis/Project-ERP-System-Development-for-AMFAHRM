// Import necessary dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Used for navigation
import { useAuth } from '../context/AuthContext';  // Used for authentication
import { MenuBar } from './MenuBar';  // Persistent menu bar component

/**
 * Layout Component
 * Wraps all pages with common elements:
 * - MenuBar (persistent left-side menu)
 * - Logout button
 * - Container for page content
 */
export function Layout({ children }) {
  // Get authentication functions
  const { logout } = useAuth();
  // Navigation hook for redirecting
  const navigate = useNavigate();

  // Handler for logout button
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <MenuBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-lg"
          >
            Logout
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
