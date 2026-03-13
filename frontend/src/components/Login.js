import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { login } from '../services/api';
import { getApiErrorMessage } from '../utils/apiError';

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
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
    maxWidth: 460,
  },
}));

const FormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  flex: '3',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
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
  [theme.breakpoints.down('md')]: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    padding: theme.spacing(3),
  },
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

const HostingNotice = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: 12,
  alignItems: 'flex-start',
}));

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [success, setSuccess] = useState(false);
  const theme = useTheme();
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
          <Typography variant="h5" component="h1" gutterBottom>
            Sign In
          </Typography>
          <HostingNotice severity="info" icon={false}>
            This project runs on free hosting. Login can take up to 60 seconds while the server wakes up.
          </HostingNotice>
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
            <Box sx={{ textAlign: 'right', mb: 3, display: { xs: 'none', md: 'block' } }}>
              <MuiLink href="#" variant="body2" sx={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
                Forgot Password?
              </MuiLink>
            </Box>
            <StyledButton type="submit" fullWidth variant="contained" sx={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'SIGN IN'}
            </StyledButton>
            {loading && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                Free server wake-up in progress. Please wait up to a minute.
              </Typography>
            )}
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
