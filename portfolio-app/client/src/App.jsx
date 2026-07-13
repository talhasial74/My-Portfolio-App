import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar    from './components/Navbar';
import Footer    from './components/Footer';
import Home      from './pages/Home';
import Projects  from './pages/Projects';
import Skills    from './pages/Skills';
import Contact   from './pages/Contact';
import AdminLogin  from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return <div className="loading">Checking auth...</div>;
  return admin ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/projects"     element={<Projects />} />
          <Route path="/skills"       element={<Skills />} />
          <Route path="/contact"      element={<Contact />} />
          <Route path="/admin/login"  element={<AdminLogin />} />
          <Route path="/admin"        element={
            <ProtectedRoute><AdminDashboard /></ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
