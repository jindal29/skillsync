import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Skills from './pages/Skills';
import CreateSkill from './pages/CreateSkill';
import SkillDetails from './pages/SkillDetails';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Mentors from './pages/Mentors';
import Community from './pages/Community';
import Events from './pages/Events';

// Protected Route Component
import { useContext } from 'react';
import AuthContext from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div style={{ textAlign: 'center', padding: '5rem 0' }}>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  const appContainerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const mainContentStyle = {
    flex: 1,
  };

  return (
    <AuthProvider>
      <Router>
        <div style={appContainerStyle}>
          <Navbar />
          <main style={mainContentStyle}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/skills" element={<Skills />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/community" element={<Community />} />
              <Route path="/events" element={<Events />} />
              <Route
                path="/skills/new"
                element={
                  <ProtectedRoute>
                    <CreateSkill />
                  </ProtectedRoute>
                }
              />
              <Route path="/skills/:id" element={<SkillDetails />} />
              <Route
                path="/chat/:id"
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
