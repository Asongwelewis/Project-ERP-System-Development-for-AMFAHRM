import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginPage } from '../pages/LoginPage';
// Explicitly import the Tabs-enabled Dashboard implementation
import { Dashboard } from '../pages/Dashboard.jsx';
import { ProtectedRoute } from '../components/ProtectedRoute';
// Academic Routes
import { Courses } from '../pages/academics/Courses';
import { CourseManagement } from '../pages/academics/CourseManagement';
import { LiveClassroom } from '../pages/academics/LiveClassroom';
import Assignments from '../pages/academics/Assignments';
import Examinations from '../pages/academics/Examinations';
import { ExamScheduler } from '../pages/academics/ExamScheduler';
import { GradeManagement } from '../pages/academics/GradeManagement';
import Schedule from '../pages/academics/Schedule';
// Admin & HR Routes
import { HRDashboard } from '../pages/admin/HRDashboard';
import { ExamSchedulingHR } from '../pages/admin/ExamSchedulingHR';
import { Employee } from '../pages/admin/Employee';
import { Attendance } from '../pages/admin/Attendance';
import { Leave } from '../pages/admin/Leave';
import { Payroll } from '../pages/admin/Payroll';
// Finance & Marketing Routes
import { Reports } from '../pages/finance/Reports';
import { Campaigns } from '../pages/finance/Campaigns';
import Delegate from '../pages/delegate/Delegate';

// Fallback NotFound component (inline)
const NotFound = () => (
  <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-8">
    <h1 className="text-2xl font-semibold text-blue-700 mb-2">Page not found</h1>
    <p className="text-sm text-muted-foreground">The page you are looking for does not exist or you don't have access.</p>
  </div>
);

export function AppRouter() {
  const { user } = useAuth();

  // Helper function to check if user has required role
  const hasRole = (allowedRoles) => {
    return user && allowedRoles.includes(user.role);
  };

  return (
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />

        {/* Protected Routes */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Delegate - Student controlled attendance intake */}
        <Route
          path="/delegate"
          element={
            <ProtectedRoute>
              {hasRole(['student', 'system_admin']) ? (
                <Delegate />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />
        {/* Student tab routes: render Dashboard for tabbed student pages */}
        <Route 
          path="/dashboard/student" 
          element={<Navigate to="/dashboard/student/overview" />} 
        />
        <Route 
          path="/dashboard/student/:tab" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Academic Routes */}
        <Route
          path="/academic/courses"
          element={
            <ProtectedRoute>
              {hasRole(['academic_staff', 'system_admin', 'hr_personnel']) ? (
                <CourseManagement />
              ) : hasRole(['student']) ? (
                <Courses />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/academic/live-classroom"
          element={
            <ProtectedRoute>
              <LiveClassroom />
            </ProtectedRoute>
          }
        />

        <Route
          path="/academic/assignments"
          element={
            <ProtectedRoute>
              {hasRole(['academic_staff', 'system_admin', 'student']) ? (
                <Assignments />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/academic/examinations"
          element={
            <ProtectedRoute>
              {hasRole(['academic_staff', 'system_admin', 'student']) ? (
                <Examinations />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/academic/exam-scheduler"
          element={
            <ProtectedRoute>
              {hasRole(['academic_staff', 'system_admin']) ? (
                <ExamScheduler />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/academic/grades"
          element={
            <ProtectedRoute>
              {hasRole(['academic_staff', 'system_admin']) ? (
                <GradeManagement />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/academic/schedule"
          element={
            <ProtectedRoute>
              {hasRole(['academic_staff', 'system_admin', 'student']) ? (
                <Schedule />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />

        {/* Admin & HR Routes */}
        <Route
          path="/admin-hr"
          element={
            <ProtectedRoute>
              {hasRole(['hr_personnel', 'system_admin']) ? (
                <HRDashboard />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-hr/exams"
          element={
            <ProtectedRoute>
              {hasRole(['hr_personnel', 'system_admin']) ? (
                <ExamSchedulingHR />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-hr/employees"
          element={
            <ProtectedRoute>
              {hasRole(['hr_personnel', 'system_admin']) ? (
                <Employee />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-hr/attendance"
          element={
            <ProtectedRoute>
              {hasRole(['hr_personnel', 'system_admin']) ? (
                <Attendance />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-hr/leave"
          element={
            <ProtectedRoute>
              {hasRole(['hr_personnel', 'system_admin']) ? (
                <Leave />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-hr/payroll"
          element={
            <ProtectedRoute>
              {hasRole(['hr_personnel', 'system_admin']) ? (
                <Payroll />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />

        {/* Finance & Marketing Routes */}
        <Route
          path="/marketing-finance/reports"
          element={
            <ProtectedRoute>
              {hasRole(['finance_staff', 'marketing_team', 'system_admin']) ? (
                <Reports />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/marketing-finance/campaigns"
          element={
            <ProtectedRoute>
              {hasRole(['marketing_team', 'system_admin']) ? (
                <Campaigns />
              ) : (
                <NotFound />
              )}
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}
