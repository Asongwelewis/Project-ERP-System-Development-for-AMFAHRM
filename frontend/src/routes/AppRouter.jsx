import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Pages (these would be imported from your pages directory)
const LoginPage = React.lazy(() => import('../pages/auth/LoginPage'));
const SignupPage = React.lazy(() => import('../pages/auth/SignupPage'));
const DashboardPage = React.lazy(() => import('../pages/dashboard/DashboardPage'));
const StudentsPage = React.lazy(() => import('../pages/students/StudentsPage'));
const CoursesPage = React.lazy(() => import('../pages/courses/CoursesPage'));
const SettingsPage = React.lazy(() => import('../pages/settings/SettingsPage'));
const PageNotFound = React.lazy(() => import('../pages/errors/PageNotFound'));

// Loading component for Suspense fallback
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
  </div>
);

// Public route wrapper
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* 404 - Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </React.Suspense>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
