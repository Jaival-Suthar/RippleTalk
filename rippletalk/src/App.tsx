import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { AuthProvider, useAuth } from './context';
import { PointsProvider } from './context/PointsProvider';
import { Navbar } from './components/Navbar';
import { LoginPage } from './pages/login/page';
import  RegisterPage  from './pages/registration/page';
import { HomePage } from './pages/home/page';
import { NewEntryPage } from './pages/newentry/page';
import ProgressPage  from './pages/progress/page';
import { AchievementsPage } from './pages/achievements/page';
import { RipplesPage } from './pages/ripples/page';
import MeditatePage  from './pages/meditate/page';

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
      <Route path="/ripples" element={<ProtectedRoute><RipplesPage /></ProtectedRoute>} />
      <Route path="/meditate" element={<ProtectedRoute><MeditatePage /></ProtectedRoute>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProtectedRoute><div>Profile Page - To be implemented</div></ProtectedRoute>} />  
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