import type { JSX } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedRoute, useAuth } from './auth';
import VoidDesk from './VoidDesk.tsx';
import Login from './Login';

function App(): JSX.Element {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <VoidDesk />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}

export default App;