import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Link as MuiLink,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CodeIcon from '@mui/icons-material/Code';
import MapIcon from '@mui/icons-material/Map';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LanguageIcon from '@mui/icons-material/Language';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import StorageIcon from '@mui/icons-material/Storage';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import { continueAsGuest } from '../store/slices/authSlice';
import AppFooter from './AppFooter';

// Styled Components
const LogoText = styled('span')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.15rem',
  color: theme.palette.primary.main,
  letterSpacing: 0.5,
}));

const NavLink = styled(MuiLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  fontSize: '0.92rem',
  marginLeft: theme.spacing(2.5),
  textDecoration: 'none',
  transition: 'color 0.2s',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    cursor: 'pointer',
  },
}));

const HeroImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
  display: 'block',
  margin: '0 auto',
}));

const HeroHeadline = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2rem',
  lineHeight: 1.15,
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3.2rem',
  },
}));

const Highlight = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const HeroSubheadline = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1rem',
  marginBottom: theme.spacing(4),
  maxWidth: 480,
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.15rem',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.95rem',
  borderRadius: 8,
  padding: theme.spacing(0.8, 2.25),
  boxShadow: '0 2px 8px 0 rgba(33, 150, 243, 0.08)',
  textTransform: 'none',
  minHeight: 38,
}));

const HeaderGhostButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.95rem',
  borderRadius: 8,
  padding: theme.spacing(0.8, 2.25),
  minHeight: 38,
  textTransform: 'none',
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.08rem',
  borderRadius: 8,
  padding: theme.spacing(1.2, 4),
  marginLeft: theme.spacing(2),
  textTransform: 'none',
  background: 'white',
  border: `1.5px solid ${theme.palette.primary.light}`,
  color: theme.palette.primary.main,
  '&:hover': {
    background: theme.palette.action.hover,
    borderColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },
}));

const PageBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#f7fafd',
  width: '100%',
}));

const FeatureIconCircle = styled(Box)(({ theme }) => ({
  background: 'rgba(33, 150, 243, 0.08)',
  color: theme.palette.primary.main,
  borderRadius: '50%',
  width: 48,
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  fontSize: 28,
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: 16,
  boxShadow: 'none',
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  transition: 'transform 0.18s ease, box-shadow 0.18s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.06)',
  },
}));

const RoadmapDisplayContainer = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: 16,
  boxShadow: 'none',
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: theme.spacing(2.5),
  marginTop: theme.spacing(4),
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  fontSize: '1rem',
  fontWeight: 500,
  height: 'auto',
  width: '100%',
  '& .MuiChip-label': {
    padding: theme.spacing(1.5, 2),
    textAlign: 'left',
  },
  borderRadius: theme.spacing(1),
  border: '1px solid',
  borderColor: theme.palette.grey[300],
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.primary,
  cursor: 'pointer',
  '&:hover': {
    opacity: 1,
    boxShadow: 'none',
    backgroundColor: theme.palette.grey[200],
  },
  boxShadow: 'none',
  padding: theme.spacing(2.5),
  marginTop: theme.spacing(2),
}));

const SkillDetailCard = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: 16,
  boxShadow: 'none',
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const FaqAccordion = styled(Accordion)(({ theme }) => ({
  background: theme.palette.common.white,
  boxShadow: 'none',
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: 8,
  marginBottom: theme.spacing(1.5),
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: theme.spacing(1.5, 0),
    borderColor: theme.palette.primary.light,
  },
}));

const FaqAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  '& .MuiAccordionSummary-content': {
    margin: 0,
  },
  '&.Mui-expanded': {
    minHeight: 48,
  },
}));

const FaqAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 3, 3),
  color: theme.palette.text.secondary,
}));

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [guestChoiceOpen, setGuestChoiceOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Web Development');
  const featureCardRefs = useRef([]);
  const [uniformFeatureCardHeight, setUniformFeatureCardHeight] = useState(null);

  const sampleRoadmaps = {
    'Web Development': {
      title: 'Web Development Roadmap',
      skills: [
        { id: 1, title: 'HTML Fundamentals', level: 'Beginner', color: 'primary' },
        { id: 2, title: 'CSS & Layouts', level: 'Beginner', color: 'success' },
        { id: 3, title: 'JavaScript Basics', level: 'Beginner', color: 'success' },
        { id: 4, title: 'React Framework', level: 'Intermediate' },
        { id: 5, title: 'Node.js Backend', level: 'Intermediate' },
        { id: 6, title: 'RESTful APIs', level: 'Intermediate' },
        { id: 7, title: 'Testing & QA', level: 'Advanced' },
        { id: 8, title: 'Deployment & DevOps', level: 'Advanced' },
      ],
    },
    'UX/UI Design': {
      title: 'UX/UI Design Roadmap',
      skills: [
        { id: 101, title: 'User Research', level: 'Beginner' },
        { id: 102, title: 'Wireframing', level: 'Beginner' },
        { id: 103, title: 'Prototyping', level: 'Intermediate' },
        { id: 104, title: 'Usability Testing', level: 'Advanced' },
      ],
    },
    'Data Science': {
      title: 'Data Science Roadmap',
      skills: [
        { id: 201, title: 'Python for Data Science', level: 'Beginner' },
        { id: 202, title: 'Statistical Analysis', level: 'Intermediate' },
        { id: 203, title: 'Machine Learning Algorithms', level: 'Advanced' },
      ],
    },
    'Languages': {
      title: 'Languages Roadmap',
      skills: [
        { id: 301, title: 'Grammar Fundamentals', level: 'Beginner' },
        { id: 302, title: 'Vocabulary Building', level: 'Intermediate' },
        { id: 303, title: 'Conversational Practice', level: 'Advanced' },
      ],
    },
  };

  const faqData = [
    {
      question: 'How do I create my first roadmap?',
      answer: 'Getting started is easy! After signing up, click on \'Create Roadmap\' and follow the guided process. You\'ll select your skill area, define your current level, set your goals, and our system will generate a personalized roadmap for you.',
    },
    {
      question: 'Are the roadmaps customizable?',
      answer: 'Yes, our roadmaps are highly customizable to fit your specific needs and goals.',
    },
    {
      question: 'Can I track my progress over time?',
      answer: 'Yes, our platform provides tools to track your progress and visualize your learning journey.',
    },
    {
      question: 'How often are roadmaps updated?',
      answer: 'Our roadmaps are regularly updated to reflect the latest industry trends and knowledge.',
    },
    {
      question: 'Is there a free plan available?',
      answer: 'Yes, we offer a free plan with essential features to get you started.',
    },
  ];

  const [selectedSkillDetail, setSelectedSkillDetail] = useState(null);

  const handleSkillClick = (skill) => {
    setSelectedSkillDetail(skill);
  };

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
      setSelectedSkillDetail(null);
    }
  };

  const openStartDialog = () => setGuestChoiceOpen(true);
  const closeStartDialog = () => setGuestChoiceOpen(false);

  const handleContinueAsGuest = () => {
    dispatch(continueAsGuest());
    closeStartDialog();
    navigate('/dashboard');
  };

  useEffect(() => {
    const syncFeatureCardHeights = () => {
      const heights = featureCardRefs.current
        .map((node) => (node ? node.offsetHeight : 0))
        .filter(Boolean);

      if (heights.length > 0) {
        setUniformFeatureCardHeight(Math.max(...heights));
      }
    };

    const id = window.requestAnimationFrame(syncFeatureCardHeights);
    window.addEventListener('resize', syncFeatureCardHeights);

    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener('resize', syncFeatureCardHeights);
    };
  }, []);

  return (
    <PageBackground>
      {/* Header */}
      <AppBar position="sticky" elevation={0} sx={{ background: 'rgba(247, 250, 253, 0.88)', boxShadow: '0 1px 0 rgba(15,23,42,0.08)', backdropFilter: 'blur(8px)', py: 0.25, minHeight: 48 }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0.5, sm: 2 }, minHeight: 40 }}>
          <LogoText onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Connect+</LogoText>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <NavLink href="#features" onClick={(e) => {
              e.preventDefault();
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}>Features</NavLink>
            <NavLink href="#examples" onClick={(e) => {
              e.preventDefault();
              document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' });
            }}>Examples</NavLink>
            <NavLink href="#faq" onClick={(e) => {
              e.preventDefault();
              document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
            }}>FAQ</NavLink>
            <HeaderGhostButton variant="outlined" color="primary" size="small" sx={{ ml: 4 }} onClick={() => navigate('/login')}>
              Login
            </HeaderGhostButton>
            <ActionButton variant="contained" color="primary" size="small" sx={{ ml: 1.5 }} onClick={openStartDialog}>
              Get Started
            </ActionButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <HeaderGhostButton size="small" variant="outlined" onClick={() => navigate('/login')}>
              Login
            </HeaderGhostButton>
            <ActionButton variant="contained" color="primary" size="small" onClick={openStartDialog}>
              Get Started
            </ActionButton>
            <IconButton onClick={() => setMobileNavOpen(true)} aria-label="open menu">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={mobileNavOpen} onClose={() => setMobileNavOpen(false)}>
        <Box sx={{ width: 260, p: 1 }}>
          <List>
            {[
              { label: 'Features', id: 'features' },
              { label: 'Examples', id: 'examples' },
              { label: 'FAQ', id: 'faq' },
            ].map((item) => (
              <ListItemButton
                key={item.id}
                onClick={() => {
                  setMobileNavOpen(false);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <Dialog open={guestChoiceOpen} onClose={closeStartDialog} fullWidth maxWidth="xs">
        <DialogTitle>Choose how to continue</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Guest mode supports one roadmap with a limited 2-3 skill path.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1, flexWrap: 'wrap' }}>
          <Button variant="outlined" onClick={() => navigate('/register')} sx={{ flex: 1, minWidth: 130 }}>
            Sign Up
          </Button>
          <Button variant="contained" onClick={handleContinueAsGuest} sx={{ flex: 1, minWidth: 130 }}>
            Continue as Guest
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 12 }, pb: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <HeroHeadline component="h1">
              Build Your <Highlight>Skills Roadmap</Highlight><br />With Precision
            </HeroHeadline>
            <HeroSubheadline>
              Visualize your learning journey, track progress, and achieve your goals with our customizable skill-based roadmap generator.
            </HeroSubheadline>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <ActionButton
              variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
              onClick={openStartDialog}
              >
                Get Started
              </ActionButton>
              <SecondaryButton
              variant="outlined"
                onClick={() => {
                  document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Examples
              </SecondaryButton>
          </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <HeroImage
              src="https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Startup Whiteboard with Roadmap"
            />
          </Grid>
        </Grid>
        </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="features">
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{
            mb: 2,
            fontWeight: 800,
            color: 'text.primary',
            letterSpacing: '-0.5px',
          }}
        >
          Features Designed for Your Learning Journey
        </Typography>
        <Typography align="center" sx={{ mb: 7, color: 'text.secondary', fontSize: '1.15rem', maxWidth: 700, mx: 'auto' }}>
          Our platform provides everything you need to create, track, and accomplish your skill development goals.
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              icon: <MapIcon fontSize="inherit" />,
              title: 'Custom Roadmaps',
              desc: 'Create personalized learning paths based on your goals, current skills, and available time.'
            },
            {
              icon: <ShowChartIcon fontSize="inherit" />,
              title: 'Progress Tracking',
              desc: 'Visualize your journey with interactive progress indicators and milestone achievements.'
            },
            {
              icon: <CalendarMonthIcon fontSize="inherit" />,
              title: 'Calendar Integration',
              desc: 'Sync your learning schedule with popular calendar apps.'
            },
            {
              icon: <DescriptionIcon fontSize="inherit" />,
              title: 'Integrated Resources',
              desc: 'Access curated learning resources directly within your roadmap.'
            },
            {
              icon: <CheckCircleIcon fontSize="inherit" />,
              title: 'Expert Validation',
              desc: 'Our roadmaps are validated by industry experts to ensure relevant, up-to-date content.'
            },
            {
              icon: <AccessTimeIcon fontSize="inherit" />,
              title: 'Weekly Time Planning',
              desc: 'Structure your roadmap into manageable weekly blocks based on your time availability.'
            }
          ].map((f, idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
              <FeatureCard
                ref={(el) => {
                  featureCardRefs.current[idx] = el;
                }}
                sx={{ height: uniformFeatureCardHeight || 'auto', width: '100%' }}
              >
                <FeatureIconCircle>{f.icon}</FeatureIconCircle>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.25 }}>{f.title}</Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.98rem', lineHeight: 1.45 }}>{f.desc}</Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Explore Sample Roadmaps Section */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="examples">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            mb: 2,
            fontWeight: 800,
            color: 'text.primary',
            letterSpacing: '-0.5px',
          }}
        >
          Explore Sample Roadmaps
        </Typography>
        <Typography align="center" sx={{ mb: 7, color: 'text.secondary', fontSize: '1.15rem', maxWidth: 700, mx: 'auto' }}>
          See how our roadmaps can guide your learning journey with structured paths to mastery.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, overflowX: 'auto', pb: 1 }}>
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={handleCategoryChange}
            aria-label="roadmap category selection"
            sx={{
              minWidth: 'max-content',
              '& .MuiToggleButtonGroup-grouped': {
                margin: theme.spacing(0.5),
                border: '1px solid',
                borderColor: theme.palette.grey[300],
                borderRadius: 8,
                '&:not(:first-of-type)': {
                  borderRadius: 8,
                  marginLeft: theme.spacing(0.5),
                },
                '&:first-of-type': {
                  borderRadius: 8,
                },
                '&:last-of-type': {
                  borderRadius: 8,
                },
              }
            }}
          >
            <ToggleButton
              value="Web Development"
              aria-label="web development"
              sx={{
                fontWeight: 600,
                textTransform: 'none',
                px: 3,
                py: 1.5,
                fontSize: '1rem',
                backgroundColor: selectedCategory === 'Web Development' ? theme.palette.primary.main : theme.palette.common.white,
                color: selectedCategory === 'Web Development' ? theme.palette.common.white : theme.palette.primary.main,
                borderColor: selectedCategory === 'Web Development' ? theme.palette.primary.main : theme.palette.grey[300],
                '&:hover': {
                  backgroundColor: selectedCategory === 'Web Development' ? theme.palette.primary.dark : theme.palette.action.hover,
                  color: selectedCategory === 'Web Development' ? theme.palette.common.white : theme.palette.text.primary,
                  borderColor: selectedCategory === 'Web Development' ? theme.palette.primary.dark : theme.palette.grey[400],
                }
              }}
            >
              <CodeIcon sx={{ mr: 1 }} /> Web Development
            </ToggleButton>
            <ToggleButton
              value="UX/UI Design"
              aria-label="ux ui design"
              sx={{
                fontWeight: 600,
                textTransform: 'none',
                px: 3,
                py: 1.5,
                fontSize: '1rem',
                backgroundColor: selectedCategory === 'UX/UI Design' ? theme.palette.primary.main : theme.palette.common.white,
                color: selectedCategory === 'UX/UI Design' ? theme.palette.common.white : theme.palette.primary.main,
                borderColor: selectedCategory === 'UX/UI Design' ? theme.palette.primary.main : theme.palette.grey[300],
                '&:hover': {
                  backgroundColor: selectedCategory === 'UX/UI Design' ? theme.palette.primary.dark : theme.palette.action.hover,
                  color: selectedCategory === 'UX/UI Design' ? theme.palette.common.white : theme.palette.text.primary,
                  borderColor: selectedCategory === 'UX/UI Design' ? theme.palette.primary.dark : theme.palette.grey[400],
                }
              }}
            >
              <DesignServicesIcon sx={{ mr: 1 }} /> UX/UI Design
            </ToggleButton>
            <ToggleButton
              value="Data Science"
              aria-label="data science"
              sx={{
                fontWeight: 600,
                textTransform: 'none',
                px: 3,
                py: 1.5,
                fontSize: '1rem',
                backgroundColor: selectedCategory === 'Data Science' ? theme.palette.primary.main : theme.palette.common.white,
                color: selectedCategory === 'Data Science' ? theme.palette.common.white : theme.palette.primary.main,
                borderColor: selectedCategory === 'Data Science' ? theme.palette.primary.main : theme.palette.grey[300],
                '&:hover': {
                  backgroundColor: selectedCategory === 'Data Science' ? theme.palette.primary.dark : theme.palette.action.hover,
                  color: selectedCategory === 'Data Science' ? theme.palette.common.white : theme.palette.text.primary,
                  borderColor: selectedCategory === 'Data Science' ? theme.palette.primary.dark : theme.palette.grey[400],
                }
              }}
            >
              <StorageIcon sx={{ mr: 1 }} /> Data Science
            </ToggleButton>
            <ToggleButton
              value="Languages"
              aria-label="languages"
              sx={{
                fontWeight: 600,
                textTransform: 'none',
                px: 3,
                py: 1.5,
                fontSize: '1rem',
                backgroundColor: selectedCategory === 'Languages' ? theme.palette.primary.main : theme.palette.common.white,
                color: selectedCategory === 'Languages' ? theme.palette.common.white : theme.palette.primary.main,
                borderColor: selectedCategory === 'Languages' ? theme.palette.primary.main : theme.palette.grey[300],
                '&:hover': {
                  backgroundColor: selectedCategory === 'Languages' ? theme.palette.primary.dark : theme.palette.action.hover,
                  color: selectedCategory === 'Languages' ? theme.palette.common.white : theme.palette.text.primary,
                  borderColor: selectedCategory === 'Languages' ? theme.palette.primary.dark : theme.palette.grey[400],
                }
              }}
            >
              <LanguageIcon sx={{ mr: 1 }} /> Languages
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <RoadmapDisplayContainer>
          <Typography variant="h5" gutterBottom>
            {sampleRoadmaps[selectedCategory]?.title}
          </Typography>
          {(() => {
            const skills = sampleRoadmaps[selectedCategory]?.skills || [];
            const columns = 4;
            const placeholders = (columns - (skills.length % columns)) % columns;
            return (
              <Grid container spacing={3}>
                {skills.map((skill) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={skill.id}>
                    <SkillChip
                      onClick={() => handleSkillClick(skill)}
                      sx={{
                        minHeight: 90,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
                        ...(selectedSkillDetail?.id === skill.id && {
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.common.white,
                          borderColor: theme.palette.primary.main,
                          '& .MuiTypography-root': {
                            color: theme.palette.common.white,
                          },
                        })
                      }}
                      label={
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                          <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1 }}>{skill.title}</Typography>
                          <Typography variant="body2" sx={{
                            fontSize: '0.9rem',
                            color: theme.palette.text.secondary,
                          }}>{skill.level}</Typography>
                        </Box>
                      }
                    />
                  </Grid>
                ))}
                {[...Array(placeholders)].map((_, i) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`placeholder-${i}`} sx={{ visibility: 'hidden' }}>
                    <Box sx={{ minHeight: 90 }} />
                  </Grid>
                ))}
              </Grid>
            );
          })()}
        </RoadmapDisplayContainer>

        {selectedSkillDetail && (
          <SkillDetailCard>
            <Typography variant="h6" gutterBottom>{selectedSkillDetail.title}</Typography>
            <Typography color="text.secondary">
              Learn the basics of {selectedSkillDetail.title.toLowerCase()}, including document structure, elements, attributes, and semantic markup. Build simple web pages and understand how browsers interpret HTML code.
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate('/roadmap/sample')}>View Full Roadmap</Button>
          </SkillDetailCard>
        )}

      </Container>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="faq">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            mb: 2,
            fontWeight: 800,
            color: 'text.primary',
            letterSpacing: '-0.5px',
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography align="center" sx={{ mb: 7, color: 'text.secondary', fontSize: '1.15rem', maxWidth: 700, mx: 'auto' }}>
          Get answers to common questions about our skill roadmap platform.
        </Typography>

        <Box sx={{ maxWidth: 700, mx: 'auto' }}>
          {faqData.map((faq, index) => (
            <FaqAccordion key={index}>
              <FaqAccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
              >
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{faq.question}</Typography>
              </FaqAccordionSummary>
              <FaqAccordionDetails>
                <Typography>{faq.answer}</Typography>
              </FaqAccordionDetails>
            </FaqAccordion>
          ))}
        </Box>

      </Container>

      <AppFooter mt={8} />

    </PageBackground>
  );
};

export default LandingPage; 
