import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
    <>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} 
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <RoadmapCreator />
            </PrivateRoute>
          }
        />
        <Route
          path="/roadmap/:id"
          element={
            <PrivateRoute>
              <RoadmapView />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
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
