
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './routers/AppRouter';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>
  );
}

export default App;
