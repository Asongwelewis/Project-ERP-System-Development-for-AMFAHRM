import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { Dashboard } from '../pages/Dashboard';
import { useAuth } from '../context/AuthContext';
import { LiveClassroom } from '../pages/academics/LiveClassroom';
import { Grades } from '../pages/academics/Grades';
import { Courses } from '../pages/academics/Courses';
import Assignments from '../pages/academics/Assignments';
import Examinations from '../pages/academics/Examinations';
import Schedule from '../pages/academics/Schedule';
import { ProtectedRoute } from '../components/ProtectedRoute';
// HR Management imports
import { Employee } from '../pages/admin/Employee';
import { Payroll } from '../pages/admin/Payroll';
import { Leave } from '../pages/admin/Leave';
import { Attendance } from '../pages/admin/Attendance';

export function AppRouter() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['system_admin', 'academic_staff', 'student', 'hr_personnel', 'finance_staff', 'marketing_team']}>
                <Dashboard />
              </ProtectedRoute>
            } />

            {/* Academic routes */}
            <Route path="/academic/courses" element={
              <ProtectedRoute allowedRoles={['academic_staff', 'student', 'system_admin']}>
                <Courses />
              </ProtectedRoute>
            } />
            <Route path="/academic/assignments" element={
              <ProtectedRoute allowedRoles={['academic_staff', 'student', 'system_admin']}>
                <Assignments />
              </ProtectedRoute>
            } />
            <Route path="/academic/examinations" element={
              <ProtectedRoute allowedRoles={['academic_staff', 'student', 'system_admin']}>
                <Examinations />
              </ProtectedRoute>
            } />
            <Route path="/academic/grades" element={
              <ProtectedRoute allowedRoles={['academic_staff', 'student', 'system_admin']}>
                <Grades />
              </ProtectedRoute>
            } />
            <Route path="/academic/schedule" element={
              <ProtectedRoute allowedRoles={['academic_staff', 'student', 'system_admin']}>
                <Schedule />
              </ProtectedRoute>
            } />
            <Route path="/academic/live-classroom" element={
              <ProtectedRoute allowedRoles={['academic_staff', 'student', 'system_admin']}>
                <LiveClassroom />
              </ProtectedRoute>
            } />
 
            {/* HR Management routes */}
            <Route path="/admin-hr/employees" element={
              <ProtectedRoute allowedRoles={['hr_personnel', 'system_admin']}>
                <Employee />
              </ProtectedRoute>
            } />
            <Route path="/admin-hr/payroll" element={
              <ProtectedRoute allowedRoles={['hr_personnel', 'system_admin']}>
                <Payroll />
              </ProtectedRoute>
            } />
            <Route path="/admin-hr/leave" element={
              <ProtectedRoute allowedRoles={['hr_personnel', 'system_admin']}>
                <Leave />
              </ProtectedRoute>
            } />
            <Route path="/admin-hr/attendance" element={
              <ProtectedRoute allowedRoles={['hr_personnel', 'system_admin']}>
                <Attendance />
              </ProtectedRoute>
            } />

            {/* Default routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
