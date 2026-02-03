
// App.jsx - Main application entry point
// Clean routing with centralized route configuration

import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from '../features/auth/context/AuthContext';
import PWAInstallPrompt from '../shared/components/PWAInstallPrompt';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <PWAInstallPrompt />
      </Router>
    </AuthProvider>
  );
}

export default App;
