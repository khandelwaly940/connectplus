import React, { useRef, useState, useEffect } from 'react';
import { Container, Typography, Card, Box, Avatar, Button, Grid, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';
import { api, getRoadmaps } from '../services/api';
import TimelineIcon from '@mui/icons-material/Timeline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';

const ProfileCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: 'none',
  border: '1px solid',
  borderColor: theme.palette.divider,
  background: '#fff',
  maxWidth: 760,
  margin: '0 auto',
  transition: 'border-color 0.2s ease',
  '&:hover': { borderColor: theme.palette.primary.light },
}));

const Profile = () => {
  const [user, setUser] = useState({ username: '', email: '' });
  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const [stats, setStats] = useState({
    activeRoadmaps: 0,
    completedRoadmaps: 0,
    averageProgress: 0,
    completedSkills: 0,
    totalLearningTime: 0,
  });

  useEffect(() => {
    api.get('/user/')
      .then(res => setUser(res.data))
      .catch(() => {/* handle error */});
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const roadmaps = await getRoadmaps();
        const active = roadmaps.filter(r => !r.completed);
        const completed = roadmaps.filter(r => r.completed);
        let totalProgress = 0;
        let countWithSkills = 0;
        let completedSkills = 0;
        let totalSkills = 0;
        let totalLearningTime = 0;
        roadmaps.forEach(roadmap => {
          if (roadmap.skills && roadmap.skills.length > 0) {
            const roadmapCompletedSkills = roadmap.skills.filter(s => s.completed);
            totalProgress += (roadmapCompletedSkills.length / roadmap.skills.length) * 100;
            countWithSkills++;
            completedSkills += roadmapCompletedSkills.length;
            totalSkills += roadmap.skills.length;
            roadmap.skills.forEach(s => {
              if (s.skill && s.skill.estimated_time) {
                totalLearningTime += s.skill.estimated_time;
              }
            });
          }
        });
        setStats({
          activeRoadmaps: active.length,
          completedRoadmaps: completed.length,
          averageProgress: countWithSkills > 0 ? totalProgress / countWithSkills : 0,
          completedSkills,
          totalLearningTime,
        });
      } catch (e) {}
    };
    fetchStats();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarUrl(ev.target.result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 6, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Fade in timeout={600}>
          <ProfileCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Box sx={{ position: 'relative', mb: 2.5 }}>
                <Avatar
                  src={avatarUrl || undefined}
                  alt={user.username}
                  sx={{ width: 92, height: 92, border: '2px solid', borderColor: 'divider', background: 'grey.100', fontSize: 36, color: 'text.primary' }}
                >
                  {(!avatarUrl && user.username) ? user.username[0] : ''}
                </Avatar>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)', fontWeight: 600, borderRadius: 2, minWidth: 0, px: 1.75, py: 0.4, fontSize: '0.82rem' }}
                  component="label"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Change Avatar'}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                  />
                </Button>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: '-0.03em' }}>Profile</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Username</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{user.username}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{user.email}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card sx={{ p: 2.5, textAlign: 'center', boxShadow: 'none', borderRadius: 3, border: '1px solid', borderColor: 'divider', background: 'background.paper' }}>
                  <EmojiEventsIcon sx={{ fontSize: 36, color: '#1976d2', mb: 1 }} />
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>{stats.completedRoadmaps}</Typography>
                  <Typography variant="body2" color="text.secondary">Completed Roadmaps</Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card sx={{ p: 2.5, textAlign: 'center', boxShadow: 'none', borderRadius: 3, border: '1px solid', borderColor: 'divider', background: 'background.paper' }}>
                  <TimelineIcon sx={{ fontSize: 36, color: '#1976d2', mb: 1 }} />
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>{stats.completedSkills}</Typography>
                  <Typography variant="body2" color="text.secondary">Skills Mastered</Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card sx={{ p: 2.5, textAlign: 'center', boxShadow: 'none', borderRadius: 3, border: '1px solid', borderColor: 'divider', background: 'background.paper' }}>
                  <SchoolIcon sx={{ fontSize: 36, color: '#1976d2', mb: 1 }} />
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>{stats.totalLearningTime}h</Typography>
                  <Typography variant="body2" color="text.secondary">Learning Time</Typography>
                </Card>
              </Grid>
            </Grid>
          </ProfileCard>
        </Fade>
      </Container>
    </>
  );
};

export default Profile; 
