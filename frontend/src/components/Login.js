import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
  useMediaQuery,
  Alert,
  CircularProgress,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { login } from '../services/api';

const LogoText = styled('span')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: theme.palette.primary.main,
  letterSpacing: 0.5,
}));

const PageBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#f0f2f5',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderRadius: 24,
  boxShadow: '0 15px 50px rgba(0,0,0,0.15)',
  overflow: 'hidden',
  width: '100%',
  maxWidth: 700,
  backgroundColor: '#fff',
}));

const FormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  flex: '3',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  flex: '2',
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
  borderTopLeftRadius: 24,
  borderBottomLeftRadius: 24,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    backgroundColor: theme.palette.grey[100],
    '& fieldset': { border: 'none' },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  borderRadius: 8,
  padding: theme.spacing(1.5, 4),
  textTransform: 'uppercase',
  boxShadow: 'none',
}));

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await login(formData.username, formData.password);
      dispatch(loginSuccess({ token: response.token, user: { username: formData.username } }));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || 'Login failed, check username or password.'));
    }
  };

  return (
    <PageBackground>
      <StyledContainer>
        <FormSection>
          <Box sx={{ mb: 4 }} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <LogoText>Connect+</LogoText>
          </Box>
          <Typography variant="h5" component="h1" gutterBottom>
            Sign In
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          )}
          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Box sx={{ textAlign: 'right', mb: 3 }}>
              <MuiLink href="#" variant="body2" sx={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
                Forgot Password?
              </MuiLink>
            </Box>
            <StyledButton type="submit" fullWidth variant="contained" sx={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'SIGN IN'}
            </StyledButton>
          </form>
        </FormSection>

        <WelcomeSection>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Hello!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: '1rem' }}>
            Join Connect+ by creating an account
          </Typography>
          <StyledButton variant="outlined" sx={{ color: 'white', borderColor: 'white' }} onClick={() => navigate('/register')}>
            SIGN UP
          </StyledButton>
        </WelcomeSection>
      </StyledContainer>

      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: 'center',
          mt: 4,
          color: theme.palette.text.secondary,
          fontSize: '0.9rem',
        }}
      >
        <Typography variant="body2">
          © 2025 Connect+ All Rights Reserved.
        </Typography>
      </Box>
    </PageBackground>
  );
};

export default Login; 