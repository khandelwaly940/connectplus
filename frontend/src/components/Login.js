import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { loginStart, loginSuccess, loginFailure, continueAsGuest } from '../store/slices/authSlice';
import { login } from '../services/api';
import { getApiErrorMessage } from '../utils/apiError';
import AppFooter from './AppFooter';

const LogoText = styled('span')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: theme.palette.primary.main,
  letterSpacing: 0.5,
}));

const PageBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#f7fafd',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderRadius: 18,
  border: '1px solid',
  borderColor: theme.palette.divider,
  boxShadow: 'none',
  overflow: 'hidden',
  width: '100%',
  maxWidth: 700,
  backgroundColor: '#fff',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
    maxWidth: 460,
  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  flex: '3',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  flex: '2',
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundImage: `linear-gradient(160deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  borderTopLeftRadius: 18,
  borderBottomLeftRadius: 18,
  [theme.breakpoints.down('md')]: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    padding: theme.spacing(3),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: 10,
    backgroundColor: '#fff',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '0.96rem',
  borderRadius: 10,
  padding: theme.spacing(1.25, 3),
  textTransform: 'none',
  boxShadow: 'none',
}));

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [success, setSuccess] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuestContinue = () => {
    dispatch(continueAsGuest());
    navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await login(formData.username, formData.password);
      dispatch(loginSuccess({ token: response.token, user: { username: formData.username } }));
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch (error) {
      dispatch(loginFailure(getApiErrorMessage(error, 'Login failed, check username or password.')));
    }
  };

  return (
    <PageBackground>
      <StyledContainer>
        <FormSection>
          <Box sx={{ mb: 4 }} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <LogoText>Connect+</LogoText>
          </Box>
          <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
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
            <StyledButton type="submit" fullWidth variant="contained" sx={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'SIGN IN'}
            </StyledButton>
            {loading && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                Server wake up in progress, please wait.
              </Typography>
            )}
            <Button variant="text" fullWidth sx={{ mt: 1.5 }} onClick={handleGuestContinue}>
              Continue as Guest
            </Button>
          </form>
          <Snackbar
            open={success}
            autoHideDuration={1200}
            message="Login successful, welcome back!"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          />
        </FormSection>

        <WelcomeSection>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Hello!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: '1rem' }}>
            Join Connect+ by creating an account
          </Typography>
          <StyledButton variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.8)' }} onClick={() => navigate('/register')}>
            SIGN UP
          </StyledButton>
        </WelcomeSection>
      </StyledContainer>

      <AppFooter mt={2.5} compact maxWidth="sm" />
    </PageBackground>
  );
};

export default Login; 
