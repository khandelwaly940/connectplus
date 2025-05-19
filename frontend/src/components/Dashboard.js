import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
  Chip,
  Paper,
  Divider,
  CircularProgress,
  IconButton,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import TimelineIcon from '@mui/icons-material/Timeline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getRoadmaps } from '../services/api';
import Navbar from './Navbar';

const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
  color: 'white',
}));

const RoadmapCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalRoadmaps: 0,
    completedSkills: 0,
    totalSkills: 0,
    averageProgress: 0,
    totalLearningTime: 0,
  });
  const [view, setView] = useState('active');
  const [showAllThisWeek, setShowAllThisWeek] = useState(false);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const data = await getRoadmaps();
      setRoadmaps(data);
      calculateStats(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch roadmaps');
      setLoading(false);
    }
  };

  const calculateStats = (roadmaps) => {
    const totalRoadmaps = roadmaps.length;
    let completedSkills = 0;
    let totalSkills = 0;
    let totalProgress = 0;
    let countWithSkills = 0;
    let totalLearningTime = 0;
    const uniqueCompletedSkillIds = new Set();
    let uniqueCompletedSkills = [];

    roadmaps.forEach(roadmap => {
      if (roadmap.skills && roadmap.skills.length > 0) {
        const roadmapCompletedSkills = roadmap.skills.filter(skill => skill.completed);
        completedSkills += roadmapCompletedSkills.length;
        totalSkills += roadmap.skills.length;
        totalProgress += (roadmapCompletedSkills.length / roadmap.skills.length) * 100;
        countWithSkills += 1;
        // Only count unique completed skills for mastered and learning time
        roadmapCompletedSkills.forEach(skill => {
          const skillId = skill.skill?.id;
          if (skillId && !uniqueCompletedSkillIds.has(skillId)) {
            uniqueCompletedSkillIds.add(skillId);
            uniqueCompletedSkills.push(skill);
          }
        });
      }
    });

    setStats({
      totalRoadmaps,
      completedSkills: uniqueCompletedSkills.length,
      totalSkills,
      averageProgress: countWithSkills > 0 ? totalProgress / countWithSkills : 0,
      totalLearningTime: uniqueCompletedSkills.reduce((sum, skill) => sum + (skill.skill?.estimated_time || 0), 0),
    });
  };

  const calculateProgress = (roadmap) => {
    if (!roadmap.skills || roadmap.skills.length === 0) return 0;
    const completedSkills = roadmap.skills.filter(skill => skill.completed).length;
    return (completedSkills / roadmap.skills.length) * 100;
  };

  // Separate roadmaps into active and completed
  const activeRoadmaps = roadmaps.filter(r => !r.completed);
  const completedRoadmaps = roadmaps.filter(r => r.completed);

  const handleViewChange = (event, newView) => {
    if (newView !== null) setView(newView);
  };

  const getStatus = (dueDate) => {
    if (!dueDate) return { label: 'On-track', color: 'success', bg: '#e8f5e9', text: '#388e3c' };
    const now = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { label: 'Behind', color: 'error', bg: '#ffebee', text: '#d32f2f' };
    if (diffDays <= 7) return { label: 'At-risk', color: 'warning', bg: '#fffde7', text: '#fbc02d' };
    return { label: 'On-track', color: 'success', bg: '#e8f5e9', text: '#388e3c' };
  };

  // Helper to get all skills for this week and overdue from previous weeks
  const getThisWeekSkills = () => {
    const today = new Date();
    let thisWeekSkills = [];
    activeRoadmaps.forEach(roadmap => {
      if (roadmap.skills) {
        roadmap.skills.forEach(skillObj => {
          const { skill, completed, start_date, end_date } = skillObj;
          if (!completed && start_date && end_date) {
            const start = new Date(start_date);
            const end = new Date(end_date);
            // This week: today in [start, end]
            // Overdue: today > end
            if ((today >= start && today <= end) || (today > end)) {
              thisWeekSkills.push({
                ...skillObj,
                roadmapTitle: roadmap.title,
                roadmapId: roadmap.id,
                isOverdue: today > end,
              });
            }
          }
        });
      }
    });
    return thisWeekSkills;
  };
  const thisWeekSkills = getThisWeekSkills();

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
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Track your progress and manage your learning journey
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2, px: 3, py: 1, fontWeight: 'bold', fontSize: '1rem', boxShadow: 2 }}
            startIcon={<AddIcon />}
            onClick={() => navigate('/create')}
          >
            Create New Roadmap
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            sx={{
              background: '#f8f9fb',
              borderRadius: 2,
              p: 0.5,
              boxShadow: 'none',
            }}
          >
            <ToggleButton
              value="active"
              aria-label="active roadmaps"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: '#444',
                backgroundColor: '#fff',
                border: '1.5px solid #e3e6f0',
                transition: 'all 0.2s',
                '&.Mui-selected': {
                  color: '#fff',
                  backgroundColor: '#1976d2',
                  border: 'none',
                  boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.08)',
                },
                '&:hover': {
                  backgroundColor: '#f5f7fa',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              Active Roadmaps
            </ToggleButton>
            <ToggleButton
              value="completed"
              aria-label="completed roadmaps"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: '#444',
                backgroundColor: '#fff',
                border: '1.5px solid #e3e6f0',
                transition: 'all 0.2s',
                '&.Mui-selected': {
                  color: '#fff',
                  backgroundColor: '#1976d2',
                  border: 'none',
                  boxShadow: '0 2px 8px 0 rgba(25, 118, 210, 0.08)',
                },
                '&:hover': {
                  backgroundColor: '#f5f7fa',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              Completed Roadmaps
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3, textAlign: 'center', boxShadow: 2, borderRadius: 3, background: '#f0f6ff' }}>
              <TimelineIcon sx={{ fontSize: 36, color: '#1976d2', mb: 1 }} />
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {view === 'active' ? activeRoadmaps.length : completedRoadmaps.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">{view === 'active' ? 'Active Roadmaps' : 'Completed Roadmaps'}</Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3, textAlign: 'center', boxShadow: 2, borderRadius: 3, background: '#f0f6ff' }}>
              <EmojiEventsIcon sx={{ fontSize: 36, color: '#1976d2', mb: 1 }} />
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {Math.round(stats.averageProgress)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">Average Progress</Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3, textAlign: 'center', boxShadow: 2, borderRadius: 3, background: '#f0f6ff' }}>
              <TimelineIcon sx={{ fontSize: 36, color: '#1976d2', mb: 1 }} />
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats.completedSkills}
              </Typography>
              <Typography variant="body2" color="text.secondary">Skills Mastered</Typography>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ p: 3, textAlign: 'center', boxShadow: 2, borderRadius: 3, background: '#f0f6ff' }}>
              <SchoolIcon sx={{ fontSize: 36, color: '#1976d2', mb: 1 }} />
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats.totalLearningTime}h
              </Typography>
              <Typography variant="body2" color="text.secondary">Learning Time</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* This Week's Learning Section */}
        {view === 'active' && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, mt: 2 }}>
              This Week's Learning
            </Typography>
            {thisWeekSkills.length === 0 ? (
              <Card sx={{ p: 3, textAlign: 'center', borderRadius: 3, boxShadow: 1, background: '#f8f9fb' }}>
                <Typography color="text.secondary">No skills scheduled for this week. Enjoy your free time or add a new roadmap!</Typography>
              </Card>
            ) : (
              <>
                <Grid container spacing={1} alignItems="stretch">
                  {(showAllThisWeek ? thisWeekSkills : thisWeekSkills.slice(0, 3)).map((skillObj, idx) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={skillObj.id + '-' + skillObj.roadmapId} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Card sx={{
                        p: 2,
                        borderRadius: 2,
                        boxShadow: 1,
                        height: '100%',
                        minHeight: 120,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'box-shadow 0.2s, transform 0.2s',
                        background: '#fff5f5',
                        '&:hover': { boxShadow: 6, transform: 'translateY(-2px) scale(1.01)', borderColor: '#90caf9' },
                      }}>
                        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {skillObj.skill.name}
                            {skillObj.isOverdue && (
                              <Chip label="Overdue" color="error" size="small" sx={{ ml: 1, fontWeight: 600 }} />
                            )}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.95rem' }}>
                            {skillObj.skill.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 0.5 }}>
                            <Chip label={skillObj.roadmapTitle} color="primary" size="small" icon={<TimelineIcon />} />
                            <Chip label={`Due: ${new Date(skillObj.end_date).toLocaleDateString()}`} size="small" icon={<SchoolIcon />} />
                            <Chip label={`${skillObj.skill.estimated_time}h`} size="small" />
                          </Box>
                        </CardContent>
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ mt: 1, fontWeight: 600, borderRadius: 2, py: 0.5, fontSize: '0.95rem', minHeight: 32, height: 32 }}
                          onClick={() => navigate(`/roadmap/${skillObj.roadmapId}`)}
                        >
                          Go to Roadmap
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                {thisWeekSkills.length > 3 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => setShowAllThisWeek(v => !v)}
                      sx={{ fontWeight: 600 }}
                    >
                      {showAllThisWeek ? 'Show Less' : 'Show All'}
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Box>
        )}

        {view === 'active' ? (
          <>
            <Typography variant="h5" sx={{ mt: 8, mb: 2, fontWeight: 'bold' }}>Active Roadmaps</Typography>
            {activeRoadmaps.length === 0 ? (
              <Card sx={{ p: 4, textAlign: 'center', mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  No active roadmaps
                </Typography>
                <Typography color="text.secondary" paragraph>
                  Start your learning journey by creating a new roadmap
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/create')}
                >
                  Create Your First Roadmap
                </Button>
              </Card>
            ) : (
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {activeRoadmaps.map((roadmap) => {
                  const completedSkills = roadmap.skills ? roadmap.skills.filter(skill => skill.completed).length : 0;
                  const totalSkills = roadmap.skills ? roadmap.skills.length : 0;
                  const progress = totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0;
                  // Calculate due date as in RoadmapView.js
                  let dueDate = null;
                  if (roadmap.skills && roadmap.skills.length > 0 && roadmap.timeline) {
                    const earliestStart = roadmap.skills.reduce((earliest, skill) => {
                      return !earliest || new Date(skill.start_date) < new Date(earliest) ? skill.start_date : earliest;
                    }, null);
                    if (earliestStart) {
                      const startDate = new Date(earliestStart);
                      dueDate = new Date(startDate);
                      dueDate.setDate(startDate.getDate() + roadmap.timeline * 7);
                    }
                  }
                  const status = getStatus(dueDate);
                  const dueDateStr = dueDate ? dueDate.toLocaleDateString('en-US') : '--';
                  return (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={roadmap.id} sx={{ mb: 3 }}>
                      <Card sx={{
                        p: 3,
                        borderRadius: 4,
                        boxShadow: 2,
                        background: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1), border-color 0.18s cubic-bezier(.4,2,.6,1)',
                        border: '1.5px solid #f0f4fa',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 6,
                          borderColor: '#90caf9',
                        },
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0 }}>{roadmap.title}</Typography>
                          <Chip label={status.label} sx={{ background: status.bg, color: status.text, fontWeight: 600, fontSize: '1rem', borderRadius: 2, px: 2, py: 0.5 }} />
                        </Box>
                        <Typography color="text.secondary" paragraph sx={{ mb: 2 }}>{roadmap.description}</Typography>
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">Progress</Typography>
                            <Typography variant="body2" color="text.secondary">{progress}%</Typography>
                          </Box>
                          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4, background: '#e3e6f0', '& .MuiLinearProgress-bar': { background: '#448aff' } }} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Box>
                            <Typography variant="body2" color="text.secondary">Skills</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{completedSkills}/{totalSkills}</Typography>
                          </Box>
                          <Box>
                            <Typography variant="body2" color="text.secondary">Due Date</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{dueDateStr}</Typography>
                          </Box>
                        </Box>
                        <Button
                          variant="outlined"
                          endIcon={<ArrowForwardIcon />}
                          sx={{ mt: 'auto', fontWeight: 600, color: '#1976d2', borderColor: '#90caf9', borderRadius: 2, py: 0.75, fontSize: '1rem', '&:hover': { background: '#e3f2fd', borderColor: '#1976d2' } }}
                          onClick={() => navigate(`/roadmap/${roadmap.id}`)}
                        >
                          Continue Learning
                        </Button>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </>
        ) : (
          <>
            <Typography variant="h5" sx={{ mt: 8, mb: 2, fontWeight: 'bold' }}>Completed Roadmaps</Typography>
            {completedRoadmaps.length === 0 ? (
              <Card sx={{ p: 4, textAlign: 'center', mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  No completed roadmaps yet
                </Typography>
                <Typography color="text.secondary" paragraph>
                  Mark a roadmap as completed to see it here
                </Typography>
              </Card>
            ) : (
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {completedRoadmaps.map((roadmap) => {
                  const completedSkills = roadmap.skills ? roadmap.skills.filter(skill => skill.completed).length : 0;
                  const totalSkills = roadmap.skills ? roadmap.skills.length : 0;
                  const progress = totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0;
                  // Calculate due date as in RoadmapView.js
                  let dueDate = null;
                  if (roadmap.skills && roadmap.skills.length > 0 && roadmap.timeline) {
                    const earliestStart = roadmap.skills.reduce((earliest, skill) => {
                      return !earliest || new Date(skill.start_date) < new Date(earliest) ? skill.start_date : earliest;
                    }, null);
                    if (earliestStart) {
                      const startDate = new Date(earliestStart);
                      dueDate = new Date(startDate);
                      dueDate.setDate(startDate.getDate() + roadmap.timeline * 7);
                    }
                  }
                  // Always show 'Completed' chip for completed roadmaps
                  const status = { label: 'Completed', bg: '#43a047', text: '#fff' };
                  const dueDateStr = dueDate ? dueDate.toLocaleDateString('en-US') : '--';
                  return (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={roadmap.id} sx={{ mb: 3 }}>
                      <Card sx={{
                        p: 3,
                        borderRadius: 4,
                        boxShadow: 2,
                        background: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1), border-color 0.18s cubic-bezier(.4,2,.6,1)',
                        border: '1.5px solid #f0f4fa',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 6,
                          borderColor: '#90caf9',
                        },
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0 }}>{roadmap.title}</Typography>
                          <Chip label={status.label} sx={{ background: status.bg, color: status.text, fontWeight: 600, fontSize: '1rem', borderRadius: 2, px: 2, py: 0.5 }} />
                        </Box>
                        <Typography color="text.secondary" paragraph sx={{ mb: 2 }}>{roadmap.description}</Typography>
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">Progress</Typography>
                            <Typography variant="body2" color="text.secondary">{progress}%</Typography>
                          </Box>
                          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4, background: '#e3e6f0', '& .MuiLinearProgress-bar': { background: '#448aff' } }} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: 2 }}>
                          <Box>
                            <Typography variant="body2" color="text.secondary">Skills</Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{completedSkills}/{totalSkills}</Typography>
                          </Box>
                        </Box>
                        <Button
                          variant="outlined"
                          endIcon={<ArrowForwardIcon />}
                          sx={{ mt: 'auto', fontWeight: 600, color: '#1976d2', borderColor: '#90caf9', borderRadius: 2, py: 0.75, fontSize: '1rem', '&:hover': { background: '#e3f2fd', borderColor: '#1976d2' } }}
                          onClick={() => navigate(`/roadmap/${roadmap.id}`)}
                        >
                          View
                        </Button>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Dashboard; 