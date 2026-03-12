import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Link as MuiLink,
  useMediaQuery,
  MenuItem,
  Snackbar,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { register } from '../services/api';
import CircularProgress from '@mui/material/CircularProgress';

// Styled Components (Copied from Login.js and adapted)
const LogoText = styled('span')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: theme.palette.primary.main,
  letterSpacing: 0.5,
}));

const PageBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#f0f2f5', // Match login page background
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  borderRadius: 24, // Match login page container
  boxShadow: '0 15px 50px rgba(0,0,0,0.15)', // Match login page container
  overflow: 'hidden',
  width: '100%',
  maxWidth: 700, // Match login page container
  backgroundColor: '#fff',
}));

const FormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6), // Match login page form section
  flex: '3', // Match login page form section proportion
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6), // Match login page welcome section
  flex: '2', // Match login page welcome section proportion
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
  marginBottom: theme.spacing(3), // Match login page text field
  '& .MuiOutlinedInput-root': {
    borderRadius: 8, // Match login page text field
    backgroundColor: theme.palette.grey[100], // Match login page text field
    '& fieldset': { border: 'none' },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 600, // Match login page button
  fontSize: '1rem', // Match login page button
  borderRadius: 8, // Match login page button
  padding: theme.spacing(1.5, 4), // Match login page button
  textTransform: 'uppercase', // Match login page button
  boxShadow: 'none',
}));

const HostingNotice = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: 12,
  alignItems: 'flex-start',
}));

const steps = ['Account Information', 'Personal Details', 'Learning Goals'];

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    learningGoals: '',
    experienceLevel: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }
    if (activeStep === 1) {
      if (!formData.firstName || !formData.lastName) {
        setError('Please fill in all fields');
        return;
      }
    }
    setError('');
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.learningGoals || !formData.experienceLevel) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const registrationData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        profile: {
          learning_goals: formData.learningGoals,
          experience_level: formData.experienceLevel
        }
      };
      await register(registrationData);
      setSuccess(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 1500);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          setError(error.response.data);
        } else if (error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError(
            Object.entries(error.response.data)
              .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`)
              .join(' | ')
          );
        }
      } else {
        setError('Registration failed');
      }
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <StyledTextField // Using styled text field
              fullWidth
              label="Username " // Added asterisk
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <StyledTextField // Using styled text field
              fullWidth
              label="Email " // Added asterisk
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <StyledTextField // Using styled text field
              fullWidth
              label="Password " // Added asterisk
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <StyledTextField // Using styled text field
              fullWidth
              label="Confirm Password " // Added asterisk
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </>
        );
      case 1:
        return (
          <>
            <StyledTextField // Using styled text field
              fullWidth
              label="First Name " // Added asterisk
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <StyledTextField // Using styled text field
              fullWidth
              label="Last Name " // Added asterisk
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <StyledTextField // Using styled text field
              fullWidth
              label="Learning Goals " // Added asterisk
              name="learningGoals"
              multiline
              rows={4}
              value={formData.learningGoals}
              onChange={handleChange}
              required
              helperText="Describe what you want to achieve"
            />
            <StyledTextField // Using styled text field
              fullWidth
              label="Experience Level "
              name="experienceLevel"
              select
              value={formData.experienceLevel}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Select your experience level</MenuItem>
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </StyledTextField>
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <PageBackground>
      <StyledContainer>
        <FormSection>
          {/* Add clickable LogoText */}
          <Box sx={{ mb: 4 }} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <LogoText>Connect+</LogoText>
          </Box>
          <Typography variant="h5" component="h1" gutterBottom>
            Create Your Account
          </Typography>
          <HostingNotice severity="info" icon={false}>
            This project runs on free hosting. Signup can take up to 60 seconds while the server wakes up.
          </HostingNotice>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            <Box sx={{ p: 2 }}>
              {getStepContent(activeStep)}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <StyledButton
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </StyledButton>
              <StyledButton
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {activeStep === steps.length - 1 ? (loading ? <CircularProgress size={24} color="inherit" /> : 'Register') : 'Next'}
              </StyledButton>
            </Box>
            {loading && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                Free server wake-up in progress. Please wait up to a minute.
              </Typography>
            )}
          </form>
          <Snackbar
            open={success}
            autoHideDuration={1500}
            message="Registration Successful, You can Login in now..."
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          />
        </FormSection>

        <WelcomeSection>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Welcome to Connect+!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: '1rem' }}>
            Already have an account?
          </Typography>
          <StyledButton variant="outlined" sx={{ color: 'white', borderColor: 'white' }} onClick={() => navigate('/login')}>
            SIGN IN
          </StyledButton>
        </WelcomeSection>
      </StyledContainer>

      {/* Footer */}
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

export default Register; 
