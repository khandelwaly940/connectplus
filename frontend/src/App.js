import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
//import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';
import { store } from './store';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import RoadmapCreator from './components/RoadmapCreator';
import RoadmapView from './components/RoadmapView';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import Settings from './components/Settings';
import { AnimatePresence, motion } from 'framer-motion';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function AppContent() {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />}
            </motion.div>
          }
        />
        <Route 
          path="/login" 
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
            </motion.div>
          }
        />
        <Route 
          path="/register" 
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />}
            </motion.div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            </motion.div>
          }
        />
        <Route
          path="/create"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PrivateRoute>
                <RoadmapCreator />
              </PrivateRoute>
            </motion.div>
          }
        />
        <Route
          path="/roadmap/:id"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PrivateRoute>
                <RoadmapView />
              </PrivateRoute>
            </motion.div>
          }
        />
        <Route
          path="/profile"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            </motion.div>
          }
        />
        <Route
          path="/settings"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            </motion.div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
