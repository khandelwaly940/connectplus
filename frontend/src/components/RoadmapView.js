import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Divider,
  Alert,
  CircularProgress,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add,
  Delete,
  ArrowBack,
  AccessTime,
  School,
  EmojiEvents,
  PlayCircleOutline,
  Description,
  Article,
  MenuBook,
  Code,
  Link,
  OpenInNew,
  CalendarToday,
  Event,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { api, getRoadmaps } from '../services/api';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiErrorMessage } from '../utils/apiError';

const RESOURCE_TYPE_OPTIONS = [
  { value: 'video', label: 'Free Video' },
  { value: 'documentation', label: 'Documentation' },
  { value: 'article', label: 'GFG/Article' },
  { value: 'book', label: 'Book' },
  { value: 'course', label: 'Course' },
  { value: 'practice', label: 'Practice' },
];

const ResourceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

// Centered tick animation overlay
function CenterTickAnimation({ show }) {
  if (!show) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="tick-anim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3000,
          pointerEvents: 'none',
          background: 'rgba(255,255,255,0.55)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.svg width={120} height={40}>
            <motion.circle
              cx={30}
              cy={20}
              r={10}
              fill="#1976d2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.circle
              cx={90}
              cy={20}
              r={10}
              fill="#1976d2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            />
            <motion.line
              x1={40}
              y1={20}
              x2={80}
              y2={20}
              stroke="#1976d2"
              strokeWidth={5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            />
          </motion.svg>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#1976d2',
            letterSpacing: 0.5,
            textShadow: '0 2px 8px rgba(80,120,200,0.10)',
            marginTop: 18
          }}>
            Keep Going!
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

const RoadmapView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [note, setNote] = useState('');
  const [selectedResourceType, setSelectedResourceType] = useState({});
  const [expandedResources, setExpandedResources] = useState({});
  const [globalCompletedSkillIds, setGlobalCompletedSkillIds] = useState(new Set());
  const [showTickAnimation, setShowTickAnimation] = useState(false);

  const fetchRoadmap = useCallback(async () => {
    try {
      const response = await api.get(`/roadmaps/${id}/`);
      setRoadmap(response.data);
      setLoading(false);
    } catch (error) {
      setError(getApiErrorMessage(error, 'Failed to fetch roadmap.'));
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRoadmap();
  }, [fetchRoadmap]);

  useEffect(() => {
    // Fetch all roadmaps for global completed skills
    const fetchAllRoadmaps = async () => {
      try {
        const data = await getRoadmaps();
        // Build set of globally completed skill IDs (excluding current roadmap)
        const completedIds = new Set();
        data.forEach(rm => {
          if (String(rm.id) !== String(id) && rm.skills) {
            rm.skills.forEach(skillObj => {
              if (skillObj.completed && skillObj.skill && skillObj.skill.id) {
                completedIds.add(skillObj.skill.id);
              }
            });
          }
        });
        setGlobalCompletedSkillIds(completedIds);
      } catch (e) {
        // ignore error for global fetch
      }
    };
    fetchAllRoadmaps();
  }, [id]);

  const handleSkillComplete = async (roadmapSkillId) => {
    try {
      const skillObj = roadmap.skills.find(s => s.id === roadmapSkillId);
      if (!skillObj.completed) { // Only animate when checking
        setShowTickAnimation(true);
        setTimeout(() => setShowTickAnimation(false), 1500);
      }
      await api.post(`/roadmaps/${roadmap.id}/complete_skill/`, {
        skill_id: roadmapSkillId
      });
      fetchRoadmap();
    } catch (error) {
      setError(getApiErrorMessage(error, 'Failed to update skill status.'));
    }
  };

  const handleAddNote = async () => {
    if (!note.trim() || !selectedSkill) return;

    try {
      await api.post(`/roadmaps/${id}/skills/${selectedSkill.id}/notes/`, {
        content: note,
      });
      setNote('');
      setOpenDialog(false);
      fetchRoadmap();
    } catch (error) {
      setError(getApiErrorMessage(error, 'Failed to add note.'));
    }
  };

  const handleDeleteNote = async (skillId, noteId) => {
    try {
      await api.delete(`/roadmaps/${id}/skills/${skillId}/notes/${noteId}/`);
      fetchRoadmap();
    } catch (error) {
      setError(getApiErrorMessage(error, 'Failed to delete note.'));
    }
  };

  const openNoteDialog = (skill) => {
    setSelectedSkill(skill);
    setNote('');
    setOpenDialog(true);
  };

  const calculateProgress = () => {
    if (!roadmap || !roadmap.skills) return 0;
    const completedSkills = roadmap.skills.filter((skill) => skill.completed).length;
    return (completedSkills / roadmap.skills.length) * 100;
  };

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return 'default';
    // If it's a number, map to string
    if (typeof difficulty === 'number') {
      switch (difficulty) {
        case 1: return 'success'; // beginner
        case 2: return 'warning'; // intermediate
        case 3: return 'error';   // advanced
        default: return 'default';
      }
    }
    // If it's a string
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  const groupResourcesByType = (resources) => {
    return resources.reduce((acc, resource) => {
      const type = resource.resource_type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(resource);
      return acc;
    }, {});
  };

  const getResourceTypeIcon = (type) => {
    switch (type) {
      case 'video': return <PlayCircleOutline />;
      case 'documentation': return <Description />;
      case 'article': return <Article />;
      case 'book': return <MenuBook />;
      case 'course': return <School />;
      case 'practice': return <Code />;
      default: return <Link />;
    }
  };

  const handleMarkCompleted = async () => {
    try {
      await api.post(`/roadmaps/${roadmap.id}/complete_all_skills/`);
      navigate('/dashboard');
    } catch (error) {
      setError(getApiErrorMessage(error, 'Failed to mark roadmap as completed.'));
    }
  };

  const handleDeleteRoadmap = async () => {
    try {
      await api.delete(`/roadmaps/${roadmap.id}/`);
      navigate('/dashboard');
    } catch (error) {
      setError(getApiErrorMessage(error, 'Failed to delete roadmap.'));
    }
  };

  // Helper to map level number or string to label
  const getLevelLabel = (level) => {
    if (!level) return '';
    if (typeof level === 'string') return level;
    switch (level) {
      case 1: return 'beginner';
      case 2: return 'intermediate';
      case 3: return 'advanced';
      case 4: return 'master';
      default: return level;
    }
  };

  // Group skills into weeks based on hours_per_week
  let weeklySkills = [];
  if (roadmap && roadmap.skills && roadmap.skills.length > 0) {
    const sortedSkills = [...roadmap.skills].sort((a, b) => a.order - b.order);
    const hoursPerWeek = roadmap.hours_per_week || 1; // fallback to 1 if not present
    let weekIdx = 0;
    let weekHours = 0;
    weeklySkills[weekIdx] = [];
    sortedSkills.forEach((skill) => {
      let remaining = skill.skill.estimated_time || 1;
      while (remaining > 0) {
        if (!weeklySkills[weekIdx]) weeklySkills[weekIdx] = [];
        const available = hoursPerWeek - weekHours;
        const toAllocate = Math.min(remaining, available);
        const skillPart = { ...skill, allocated_hours: toAllocate, isPartial: remaining > toAllocate };
        weeklySkills[weekIdx].push(skillPart);
        weekHours += toAllocate;
        remaining -= toAllocate;
        if (weekHours >= hoursPerWeek) {
          weekIdx++;
          weekHours = 0;
        }
      }
    });
  }

  // Helper to generate Google Calendar event link for a week
  const getGoogleCalendarUrl = (weekSkills, weekNum) => {
    if (!weekSkills || weekSkills.length === 0) return '#';
    // Get the start date of week 1 from the first skill in the roadmap
    const allSkillsSorted = [...roadmap.skills].sort((a, b) => a.order - b.order);
    const week1Start = new Date(allSkillsSorted[0].start_date);
    // Calculate this week's start date
    const weekStart = new Date(week1Start);
    weekStart.setDate(weekStart.getDate() + (weekNum - 1) * 7);
    // End date is 7 days after start (exclusive)
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    // Format as YYYYMMDDTHHmmssZ (UTC)
    const pad = (n) => n.toString().padStart(2, '0');
    const formatDate = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T000000Z`;
    const startStr = formatDate(weekStart);
    const endStr = formatDate(weekEnd);
    const title = encodeURIComponent(`${roadmap.title} - Week ${weekNum}`);
    const details = encodeURIComponent(
      weekSkills.map((s, i) => `${i + 1}. ${s.skill.name}`).join('\n')
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}`;
  };

  // Calculate due date as (earliest skill start_date + timeline weeks)
  let roadmapDueDate = null;
  let isOverdue = false;
  if (roadmap && roadmap.skills && roadmap.skills.length > 0) {
    const earliestStart = roadmap.skills.reduce((earliest, skill) => {
      return !earliest || new Date(skill.start_date) < new Date(earliest) ? skill.start_date : earliest;
    }, null);
    if (earliestStart && roadmap.timeline) {
      const startDate = new Date(earliestStart);
      const dueDate = new Date(startDate);
      dueDate.setDate(startDate.getDate() + roadmap.timeline * 7);
      roadmapDueDate = dueDate;
      const today = new Date();
      isOverdue = today > dueDate;
    }
  }

  // Format created date for display
  let createdDateStr = '';
  if (roadmap && roadmap.created_at) {
    const d = new Date(roadmap.created_at);
    if (d instanceof Date && !isNaN(d.getTime())) {
      const day = d.getDate().toString().padStart(2, '0');
      const month = d.toLocaleString('default', { month: 'long' });
      const year = d.getFullYear().toString().slice(-2);
      createdDateStr = `Created: ${day}-${month}-${year}`;
    }
  }

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      </Container>
    );
  }

  if (!roadmap) {
    return (
      <Container>
        <Alert severity="info" sx={{ mt: 2 }}>Roadmap not found</Alert>
      </Container>
    );
  }

  return (
    <>
      <CenterTickAnimation show={showTickAnimation} />
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {roadmap.target_unreachable && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            Warning: Based on your selected timeline and hours per week, the target level could not be reached. The roadmap covers as much as possible.
          </Alert>
        )}
        {!roadmap.target_unreachable && roadmap.timeline && weeklySkills.length > 0 && weeklySkills.length < Number(roadmap.timeline) && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Good news! Based on your selected skills and target, you can reach your goal in just <b>{weeklySkills.length} week{weeklySkills.length > 1 ? 's' : ''}</b>, which is less than your selected <b>{roadmap.timeline} week{roadmap.timeline > 1 ? 's' : ''}</b>.
          </Alert>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <IconButton onClick={() => navigate('/dashboard')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 240 }, fontSize: { xs: '1.6rem', md: '2.1rem' } }}>
            {roadmap.title}
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ ml: { xs: 0, sm: 2 }, flex: { xs: 1, sm: 'unset' }, minWidth: { xs: '48%', sm: 0 } }}
            onClick={handleMarkCompleted}
          >
            Mark Completed
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ ml: { xs: 0, sm: 2 }, flex: { xs: 1, sm: 'unset' }, minWidth: { xs: '48%', sm: 0 } }}
            onClick={handleDeleteRoadmap}
          >
            Delete
          </Button>
        </Box>

        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, mb: 4 }}>
          <Typography color="text.secondary" paragraph>
            {roadmap.description}
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
            <Grid size={{ xs: 12, sm: 3, md: 2.4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTime color="action" sx={{ fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  Timeline: {roadmap.timeline} weeks
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 3, md: 2.4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Event color="action" sx={{ fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  {createdDateStr}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 3, md: 2.4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Event color={isOverdue ? 'error' : 'action'} sx={{ fontSize: 20 }} />
                <Typography variant="body2" color={isOverdue ? 'error' : 'text.secondary'}>
                  {(() => {
                    const d = roadmapDueDate;
                    if (d instanceof Date && !isNaN(d.getTime())) {
                      const day = d.getDate().toString().padStart(2, '0');
                      const month = d.toLocaleString('default', { month: 'long' });
                      const year = d.getFullYear().toString().slice(-2);
                      const formatted = `${day}-${month}-${year}`;
                      return isOverdue
                        ? `Overdue (was due: ${formatted})`
                        : `Due: ${formatted}`;
                    }
                    return '';
                  })()}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 3, md: 2.4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <School color="action" sx={{ fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  Current Level: {getLevelLabel(roadmap.current_level)}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 3, md: 2.4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmojiEvents color="action" sx={{ fontSize: 20 }} />
                <Typography variant="body2" color="text.secondary">
                  Target Level: {getLevelLabel(roadmap.target_level)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Overall Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round(calculateProgress())}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={calculateProgress()}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        </Paper>

        {/* Weekly grouping display */}
        {weeklySkills.map((weekSkills, idx) => {
          // Find the latest end_date among all skill parts in this week
          const weekEndDates = weekSkills.map(s => s.end_date ? new Date(s.end_date) : null).filter(Boolean);
          const weekEndDate = weekEndDates.length > 0 ? new Date(Math.max(...weekEndDates.map(d => d.getTime()))) : null;
          const today = new Date();
          const isOverdue = weekEndDate && today > weekEndDate && weekSkills.some(s => !s.completed);
          // Calculate week progress
          const weekCompleted = weekSkills.filter(s => s.completed).length;
          const weekProgress = (weekCompleted / weekSkills.length) * 100;
          return (
            <React.Fragment key={idx}>
              <Box sx={{
                mb: 5,
                p: 0,
                borderRadius: 4,
                background: '#f8fafd',
                border: '1.5px solid #e3e8ee',
                boxShadow: '0 2px 12px rgba(80,120,200,0.04)',
                transition: 'box-shadow 0.2s, transform 0.2s',
                '&:hover': {
                  boxShadow: '0 6px 24px rgba(80,120,200,0.10)',
                  transform: 'translateY(-2px) scale(1.01)',
                },
              }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 0 },
                  mb: 0,
                  px: { xs: 2, sm: 4 },
                  pt: { xs: 2, sm: 3 },
                  pb: 2,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  background: isOverdue ? 'rgba(255,0,0,0.04)' : 'transparent',
                  borderBottom: '1px solid #e3e8ee',
                }}>
                  <Typography variant="h5" sx={{ mr: 2, color: isOverdue ? 'error.main' : 'primary.main', fontWeight: 800, letterSpacing: '-1px', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                    Week {idx + 1}
                  </Typography>
                  {roadmap.hours_per_week && (
                    <Typography component="span" variant="body1" color="text.secondary" sx={{ ml: 1, fontWeight: 500, fontSize: '1.1rem' }}>
                      ({roadmap.hours_per_week} hour{roadmap.hours_per_week > 1 ? 's' : ''}/week)
                    </Typography>
                  )}
                  {isOverdue && (
                    <Chip label="Overdue" color="error" sx={{ ml: 2, fontWeight: 600 }} />
                  )}
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<CalendarToday />}
                    href={getGoogleCalendarUrl(weekSkills, idx + 1)}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ ml: { xs: 0, sm: 'auto' }, width: { xs: '100%', sm: 'auto' }, fontWeight: 600 }}
                  >
                    Add to Google Calendar
                  </Button>
                </Box>
                {/* Animated week progress bar */}
                <Box sx={{ px: { xs: 2, sm: 4 }, pt: 1, pb: 0 }}>
                  <LinearProgress
                    key={weekProgress}
                    variant="determinate"
                    value={weekProgress}
                    sx={{ height: 7, borderRadius: 4, background: '#e3e8ee', mb: 1, transition: 'all 0.7s cubic-bezier(.4,2,.6,1)' }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {Math.round(weekProgress)}% complete this week
                  </Typography>
                </Box>
                {/* Fade in each task card */}
                {weekSkills.map((step, index) => {
                  const skillKey = `${step.id}-${index}`;
                  const isExpanded = expandedResources[skillKey] || false;
                  return (
                    <Fade in={true} timeout={500 + index * 80} key={skillKey}>
                      <div>
                        <Paper
                          elevation={2}
                          sx={{
                            mb: 3,
                            p: { xs: 2, sm: 3 },
                            border: '1.5px solid #e3e8ee',
                            borderRadius: 4,
                            boxShadow: '0 2px 12px rgba(80,120,200,0.07)',
                            background: '#fff',
                            transition: 'box-shadow 0.2s, transform 0.2s',
                            '&:hover': {
                              boxShadow: 8,
                              transform: 'translateY(-3px) scale(1.015)',
                              borderColor: '#90caf9',
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box
                              sx={{
                                mr: 1,
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)',
                                transform: step.completed ? 'scale(1.18)' : 'scale(1)',
                              }}
                            >
                              <Checkbox
                                checked={step.completed}
                                onChange={() => handleSkillComplete(step.id)}
                                color="primary"
                                inputProps={{ 'aria-label': 'Mark step as complete' }}
                                sx={{ p: 0, '& .MuiSvgIcon-root': { fontSize: 28 } }}
                              />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.18rem', mb: 0, color: '#222', letterSpacing: '-0.5px' }}>
                              {step.skill.name}
                              {globalCompletedSkillIds.has(step.skill.id) && (
                                <Chip label="Completed in another roadmap" color="warning" size="small" sx={{ ml: 2, fontWeight: 400 }} />
                              )}
                              {step.isPartial && (
                                <Typography component="span" variant="body2" color="primary" sx={{ ml: 2, fontWeight: 400 }}>
                                  (Continued next week)
                                </Typography>
                              )}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ ml: { xs: 0, sm: 5 }, mb: 2, fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.7, letterSpacing: 0.1 }}>
                            {step.skill.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, ml: { xs: 0, sm: 5 }, flexWrap: 'wrap', mb: 1 }}>
                            <Chip
                              icon={<AccessTime sx={{ fontSize: 18, color: '#90caf9' }} />}
                              label={`${step.allocated_hours || step.skill.estimated_time} hours`}
                              size="small"
                              sx={{ fontWeight: 500, fontSize: '0.98rem', background: '#f0f6ff', color: '#1976d2', px: 1.5, borderRadius: 2, boxShadow: 'none' }}
                            />
                            <Chip
                              label={getLevelLabel(step.skill.difficulty_level || step.skill.level || 'N/A')}
                              size="small"
                              sx={{ fontWeight: 500, fontSize: '0.98rem', background: '#f5f6fa', color: '#555', textTransform: 'capitalize', px: 1.5, borderRadius: 2, boxShadow: 'none' }}
                            />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: { xs: 0, sm: 5 }, mb: 2, flexWrap: 'wrap' }}>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<Add />}
                              onClick={() => openNoteDialog(step)}
                            >
                              Add Note
                            </Button>
                            {step.notes?.length > 0 && (
                              <Typography variant="body2" color="text.secondary">
                                {step.notes.length} note{step.notes.length > 1 ? 's' : ''}
                              </Typography>
                            )}
                          </Box>
                          {step.notes?.length > 0 && (
                            <Box sx={{ ml: { xs: 0, sm: 5 }, mb: 2, display: 'grid', gap: 1.5 }}>
                              {step.notes.map((entry) => (
                                <Paper
                                  key={entry.id}
                                  variant="outlined"
                                  sx={{ p: 1.5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}
                                >
                                  <Box sx={{ minWidth: 0 }}>
                                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                      {entry.content}
                                    </Typography>
                                    {entry.created_at && (
                                      <Typography variant="caption" color="text.secondary">
                                        {new Date(entry.created_at).toLocaleString()}
                                      </Typography>
                                    )}
                                  </Box>
                                  <Tooltip title="Delete note">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => handleDeleteNote(step.id, entry.id)}
                                    >
                                      <Delete fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Paper>
                              ))}
                            </Box>
                          )}
                          <Box sx={{ mt: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                              <Typography variant="h6" sx={{ mr: 2, fontWeight: 700, fontSize: '1.08rem', color: '#1976d2' }}>Learning Resources</Typography>
                              <Button
                                size="small"
                                onClick={() => setExpandedResources(prev => ({ ...prev, [skillKey]: !isExpanded }))}
                                startIcon={
                                  <Box
                                    component="span"
                                    sx={{
                                      display: 'inline-flex',
                                      transition: 'transform 0.3s',
                                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }}
                                  >
                                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                                  </Box>
                                }
                                sx={{ textTransform: 'none', fontWeight: 600 }}
                              >
                                {isExpanded ? 'Hide Resources' : 'Show Resources'}
                              </Button>
                              <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 200 }, ml: { xs: 0, sm: 2 } }}>
                                <InputLabel>Filter by Type</InputLabel>
                                <Select
                                  value={selectedResourceType[step.id] || 'all'}
                                  onChange={(e) =>
                                    setSelectedResourceType((prev) => ({
                                      ...prev,
                                      [step.id]: e.target.value,
                                    }))
                                  }
                                  label="Filter by Type"
                                >
                                  <MenuItem value="all">All Resources</MenuItem>
                                  {RESOURCE_TYPE_OPTIONS.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                      {type.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Box>
                            <Collapse in={isExpanded} timeout={350} unmountOnExit>
                              <Box sx={{ background: '#f6fafd', borderRadius: 2, p: 2, mt: 1 }}>
                                {Object.entries(groupResourcesByType(step.skill.learning_resources))
                                  .filter(([type]) => (selectedResourceType[step.id] || 'all') === 'all' || type === selectedResourceType[step.id])
                                  .map(([type, resources]) => (
                                    <Box key={type} sx={{ mb: 4 }}>
                                      <Typography variant="subtitle1" sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        mb: 2,
                                        color: 'primary.main'
                                      }}>
                                        {getResourceTypeIcon(type)}
                                        <Box component="span" sx={{ ml: 1 }}>
                                          {type.charAt(0).toUpperCase() + type.slice(1)} Resources
                                        </Box>
                                      </Typography>
                                      <Grid container spacing={2}>
                                        {resources.map((resource) => (
                                          <Grid size={{ xs: 12, md: 6 }} key={resource.id}>
                                            <ResourceCard sx={{
                                              borderRadius: 3,
                                              boxShadow: '0 2px 10px rgba(80,120,200,0.07)',
                                              transition: 'box-shadow 0.2s, transform 0.2s',
                                              mb: 2,
                                              '&:hover': {
                                                boxShadow: '0 8px 24px rgba(80,120,200,0.13)',
                                                transform: 'translateY(-2px) scale(1.01)',
                                              },
                                            }}>
                                              <CardContent sx={{ pb: '16px !important' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                                  <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="h6" gutterBottom>
                                                      {resource.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" paragraph>
                                                      {resource.description}
                                                    </Typography>
                                                  </Box>
                                                  <Chip
                                                    label={`${resource.estimated_time}h`}
                                                    size="small"
                                                    color="primary"
                                                    sx={{ ml: 1 }}
                                                  />
                                                </Box>
                                                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                                  <Chip
                                                    icon={<AccessTime fontSize="small" />}
                                                    label={`${resource.estimated_time} hours`}
                                                    size="small"
                                                    variant="outlined"
                                                  />
                                                  <Chip
                                                    icon={<School fontSize="small" />}
                                                    label={resource.difficulty_level}
                                                    size="small"
                                                    variant="outlined"
                                                    color={getDifficultyColor(resource.difficulty_level)}
                                                  />
                                                </Box>
                                                <Button
                                                  href={resource.url}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  variant="contained"
                                                  size="small"
                                                  fullWidth
                                                  startIcon={<OpenInNew />}
                                                >
                                                  Access Resource
                                                </Button>
                                              </CardContent>
                                            </ResourceCard>
                                          </Grid>
                                        ))}
                                      </Grid>
                                    </Box>
                                  ))}
                              </Box>
                            </Collapse>
                          </Box>
                        </Paper>
                      </div>
                    </Fade>
                  );
                })}
              </Box>
              {/* Soft divider between weeks */}
              {idx < weeklySkills.length - 1 && <Divider sx={{ my: 4, borderColor: '#e3e8ee' }} />}
            </React.Fragment>
          );
        })}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add Note for {selectedSkill?.skill?.name}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Note"
              fullWidth
              multiline
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddNote} variant="contained">
              Add Note
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default RoadmapView; 
