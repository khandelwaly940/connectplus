import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  AppBar,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { exitGuestMode, logout } from '../store/slices/authSlice';

const LogoText = styled('span')(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.25rem',
  color: theme.palette.primary.main,
  letterSpacing: 0.5,
}));

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, mode } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    if (mode === 'guest') {
      dispatch(exitGuestMode());
    } else {
      dispatch(logout());
    }
    navigate('/');
    handleCloseMenu();
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(247, 250, 253, 0.9)',
        boxShadow: '0 1px 0 rgba(15, 23, 42, 0.08)',
        backdropFilter: 'blur(8px)',
        py: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
        <LogoText onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Connect+</LogoText>
        {isAuthenticated && (
          <>
            {mode === 'guest' && <Chip label="Guest Mode" color="warning" size="small" sx={{ mr: 1 }} />}
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
          </>
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
          {mode !== 'guest' && <MenuItem onClick={() => { navigate('/profile'); handleCloseMenu(); }}>Profile</MenuItem>}
          <MenuItem onClick={() => { navigate('/settings'); handleCloseMenu(); }}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>{mode === 'guest' ? 'Exit Guest Mode' : 'Logout'}</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 
