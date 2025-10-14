import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { AuthProvider, useAuth } from './context';
import { PointsProvider } from './context/PointsProvider';
import { Navbar } from './components/Navbar';
import { LoginPage } from './pages/login/page';
import { HomePage } from './pages/home/page';
import { NewEntryPage } from './pages/newentry/page';
import { ProgressPage } from './pages/progress/page';
import { AchievementsPage } from './pages/achievements/page';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/new" element={<ProtectedRoute><NewEntryPage /></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
      <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
    </Routes>
  </>
);

function App() {
  return (
    <AuthProvider>
      <PointsProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PointsProvider>
    </AuthProvider>
  );
}

export default App;