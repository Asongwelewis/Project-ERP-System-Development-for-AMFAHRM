
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { Dashboard } from './pages/Dashboard';
import { JwtAuthProvider, useJwtAuth } from './context/JwtAuthContext';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useJwtAuth();
  return user ? children : <Navigate to="/login" replace />;
};

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <JwtAuthProvider>
        <AppContent />
      </JwtAuthProvider>
    </Router>
  );
}

export default App;
