import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout } from '../store/slices/authSlice';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
  boxShadow: theme.shadows[4],
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: 'white',
  margin: theme.spacing(0, 1),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  ...(active && {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }),
}));

const LogoText = styled('span')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: theme.palette.primary.main,
  letterSpacing: 0.5,
}));

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleCloseMenu();
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMobileMenu = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuAnchorEl(null);
  };

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    handleCloseMobileMenu();
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ background: '#f7fafd', boxShadow: 'none', py: 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 4 } }}>
        <LogoText onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Connect+</LogoText>
        {isAuthenticated && (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleOpenMenu}
              size="small"
              sx={{ ml: 2 }}
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <Avatar sx={{ width: 40, height: 40 }}>
                {user?.username?.[0]?.toUpperCase() || <AccountCircleIcon />}
              </Avatar>
            </IconButton>
          </Tooltip>
        )}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={() => { navigate('/profile'); handleCloseMenu(); }}>Profile</MenuItem>
          <MenuItem onClick={() => { navigate('/settings'); handleCloseMenu(); }}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 