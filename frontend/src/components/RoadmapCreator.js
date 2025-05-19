import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
  Grid,
  Autocomplete,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { api, generateRoadmap } from '../services/api';
import Navbar from './Navbar';

const steps = ['Basic Information', 'Domain & Levels', 'Timeline'];

const DOMAIN_OPTIONS = [
  { value: 'Web', label: 'Web Development' },
  { value: 'ML', label: 'Machine Learning' },
  { value: 'Python', label: 'Python' },
  { value: 'Java', label: 'Java' },
  { value: 'DSA', label: 'DSA' },
  { value: 'Android', label: 'Android Development' },
];

const RESOURCE_TYPE_OPTIONS = [
  { value: 'video', label: 'Free Video' },
  { value: 'documentation', label: 'Documentation' },
  { value: 'article', label: 'GFG/Article' },
  { value: 'book', label: 'Book' },
  { value: 'course', label: 'Course' },
  { value: 'practice', label: 'Practice' },
];

const LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'master', label: 'Master' },
];

const getTargetLevelOptions = (currentLevel) => {
  switch (currentLevel) {
    case 'beginner':
      return LEVELS.filter(l => l.value === 'intermediate' || l.value === 'advanced');
    case 'intermediate':
      return LEVELS.filter(l => l.value === 'advanced');
    case 'advanced':
      return LEVELS.filter(l => l.value === 'master');
    default:
      return LEVELS.filter(l => l.value !== currentLevel);
  }
};

const StyledPage = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#f7fafd',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 20,
  boxShadow: theme.shadows[4],
  background: '#fff',
  padding: theme.spacing(6, 4),
  maxWidth: 1000,
  width: '90%',
  margin: 'auto',
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(6),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    backgroundColor: '#f8f9fb',
    '& fieldset': { border: 'none' },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  borderRadius: 10,
  padding: theme.spacing(1.2, 4),
  textTransform: 'none',
  boxShadow: 'none',
}));

const RoadmapCreator = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    resourceTypes: [],
    currentLevel: '',
    targetLevel: '',
    timeline: '',
    hoursPerWeek: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [availableResources, setAvailableResources] = useState([]);

  useEffect(() => {
    const fetchSkillsAndResources = async () => {
      try {
        const [skillsResponse, resourcesResponse] = await Promise.all([
          api.get('/skills/'),
          api.get('/resources/'),
        ]);
        
        // Sort skills by name and remove duplicates
        const uniqueSkills = Array.from(new Set(skillsResponse.data.map(skill => skill.name)))
          .map(name => {
            const skill = skillsResponse.data.find(s => s.name === name);
            return {
              id: skill.id,
              name: name,
              description: skill.description,
              difficulty_level: skill.difficulty_level
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name));

        // Sort resources by title
        const sortedResources = resourcesResponse.data
          .sort((a, b) => a.title.localeCompare(b.title));

        setAvailableSkills(uniqueSkills);
        setAvailableResources(sortedResources);
      } catch (error) {
        setError('Failed to load skills and resources');
        console.error('Error fetching data:', error);
      }
    };

    fetchSkillsAndResources();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleResourceTypeChange = (event) => {
    setFormData({
      ...formData,
      resourceTypes: event.target.value,
    });
    setError('');
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        if (!formData.title.trim()) {
          setError('Please enter a roadmap title');
          return false;
        }
        if (!formData.description.trim()) {
          setError('Please enter a description');
          return false;
        }
        return true;
      case 1:
        if (!formData.category) {
          setError('Please select a domain');
          return false;
        }
        if (!formData.currentLevel) {
          setError('Please select your current level');
          return false;
        }
        if (!formData.targetLevel) {
          setError('Please select your target level');
          return false;
        }
        if (formData.currentLevel === formData.targetLevel) {
          setError('Target level must be different from current level');
          return false;
        }
        return true;
      case 2:
        if (!formData.timeline) {
          setError('Please select a timeline');
          return false;
        }
        if (!formData.hoursPerWeek || isNaN(formData.hoursPerWeek) || formData.hoursPerWeek <= 0) {
          setError('Please enter valid hours per week');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setError('');
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(activeStep)) {
      return;
    }
    setLoading(true);
    try {
      const response = await generateRoadmap({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        current_level: formData.currentLevel,
        target_level: formData.targetLevel,
        timeline: parseInt(formData.timeline),
        hours_per_week: parseInt(formData.hoursPerWeek),
      });
      if (!response || !response.id) {
        setError('No roadmap could be generated for this input. Please change your timeline or other options.');
        setLoading(false);
        return;
      }
      navigate(`/roadmap/${response.id}`);
    } catch (error) {
      let errorMsg = 'Failed to create roadmap. Please try again.';
      if (error.response && error.response.data) {
        errorMsg = JSON.stringify(error.response.data, null, 2);
      }
      setError(errorMsg);
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <StyledTextField
              label="Roadmap Name"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              placeholder="e.g., Full Stack Development Journey"
            />
            <StyledTextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
              multiline
              minRows={3}
              placeholder="Describe your learning goals and objectives..."
            />
          </>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth margin="normal" required error={error && !formData.category}>
                <InputLabel>Domain</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Domain"
                >
                  {DOMAIN_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth margin="normal" required error={error && !formData.currentLevel}>
                <InputLabel>Current Level</InputLabel>
                <Select
                  name="currentLevel"
                  value={formData.currentLevel}
                  onChange={handleChange}
                  label="Current Level"
                >
                  {LEVELS.filter(l => l.value !== 'master').map((level) => (
                    <MenuItem key={level.value} value={level.value}>{level.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth margin="normal" required error={error && !formData.targetLevel}>
                <InputLabel>Target Level</InputLabel>
                <Select
                  name="targetLevel"
                  value={formData.targetLevel}
                  onChange={handleChange}
                  label="Target Level"
                  disabled={!formData.currentLevel}
                >
                  {getTargetLevelOptions(formData.currentLevel).map((level) => (
                    <MenuItem key={level.value} value={level.value}>{level.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid size={12}>
              <FormControl fullWidth margin="normal" required error={error && !formData.timeline}>
                <InputLabel>Timeline (weeks)</InputLabel>
                <Select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  label="Timeline (weeks)"
                >
                  <MenuItem value="4">4 weeks</MenuItem>
                  <MenuItem value="8">8 weeks</MenuItem>
                  <MenuItem value="12">12 weeks</MenuItem>
                  <MenuItem value="16">16 weeks</MenuItem>
                  <MenuItem value="24">24 weeks</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <StyledTextField
                label="Hours per week"
                name="hoursPerWeek"
                type="number"
                value={formData.hoursPerWeek}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ min: 1 }}
                placeholder="e.g., 5"
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <StyledPage>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <StyledPaper>
          <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 800, mb: 4 }}>
            Create a New Roadmap
          </Typography>
          <Stepper activeStep={activeStep} sx={{ mb: 5, background: 'transparent' }} alternativeLabel>
            {steps.map((label, idx) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-label': {
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: activeStep === idx ? 'primary.main' : '#888',
                    },
                    '& .MuiStepIcon-root': {
                      color: activeStep === idx ? 'primary.main' : '#cfd8dc',
                      fontSize: 32,
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          )}
          <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
              <StyledButton
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="text"
                color="primary"
              >
                Back
              </StyledButton>
              <StyledButton
                variant="contained"
                color="primary"
                type={activeStep === steps.length - 1 ? 'submit' : 'button'}
                onClick={activeStep === steps.length - 1 ? undefined : handleNext}
                disabled={loading}
                sx={{ minWidth: 140 }}
              >
                {activeStep === steps.length - 1 ? (loading ? 'Creating...' : 'Finish & Generate Roadmap') : 'Next Step'}
              </StyledButton>
            </Box>
          </form>
        </StyledPaper>
      </Container>
    </StyledPage>
  );
};

export default RoadmapCreator; 