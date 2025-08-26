
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard.jsx';
import { LoadingSpinner } from './components/LoadingSpinner';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
      <Route path="/dashboard">
        <Route index element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="student" element={<Navigate to="/dashboard/student/overview" replace />} />
        <Route path="student/:tab" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
      </Route>
      <Route 
        path="/" 
        element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
