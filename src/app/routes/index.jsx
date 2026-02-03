
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../../features/auth/pages/LandingPage';
import LoginPage from '../../features/auth/pages/LoginPage';
import PatientDashboard from '../../features/patient/pages/PatientDashboard';
import WorkoutSession from '../../features/patient/pages/WorkoutSession';
import DoctorDashboard from '../../features/doctor/pages/DoctorDashboard';
import PatientDetailView from '../../features/doctor/pages/PatientDetailView';
import ProtectedRoute from '../../shared/components/ProtectedRoute';
import { useAuth } from '../../features/auth/context/AuthContext';

function AppRoutes() {
  const { user, userData, loading } = useAuth();

  if (loading) return null; // Let ProtectedRoute handle initial load spin

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={userData?.userType === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard'} replace />
          ) : (
            <LandingPage />
          )
        }
      />

      <Route
        path="/login"
        element={
          user ? (
            <Navigate to={userData?.userType === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard'} replace />
          ) : (
            <LoginPage />
          )
        }
      />

      {/* Patient Routes */}
      <Route
        path="/patient-dashboard"
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workout"
        element={
          <ProtectedRoute allowedRole="patient">
            <WorkoutSession />
          </ProtectedRoute>
        }
      />

      {/* Doctor Routes */}
      <Route
        path="/doctor-dashboard"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/:patientId"
        element={
          <ProtectedRoute allowedRole="doctor">
            <PatientDetailView />
          </ProtectedRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
