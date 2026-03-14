import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Alert,
  useMediaQuery,
  MenuItem,
  Snackbar,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { register } from '../services/api';
import CircularProgress from '@mui/material/CircularProgress';
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

const steps = ['Account Information', 'Personal Details', 'Learning Goals'];

const Register = () => {
  const navigate = useNavigate();
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      setError(getApiErrorMessage(error, 'Registration failed'));
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <StyledTextField
              fullWidth
              label="Username "
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              label="Email "
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              label="Password "
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              label="Confirm Password "
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
            <StyledTextField
              fullWidth
              label="First Name "
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              label="Last Name "
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
            <StyledTextField
              fullWidth
              label="Learning Goals "
              name="learningGoals"
              multiline
              rows={4}
              value={formData.learningGoals}
              onChange={handleChange}
              required
              helperText="Describe what you want to achieve"
            />
            <StyledTextField
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
          <Box sx={{ mb: 4 }} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <LogoText>Connect+</LogoText>
          </Box>
          <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Create Your Account
          </Typography>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel={!isMobile}>
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
                Server wake up in progress, please wait.
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
          <StyledButton variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.8)' }} onClick={() => navigate('/login')}>
            SIGN IN
          </StyledButton>
        </WelcomeSection>
      </StyledContainer>

      <AppFooter mt={2.5} compact maxWidth="sm" />
    </PageBackground>
  );
};

export default Register; 
