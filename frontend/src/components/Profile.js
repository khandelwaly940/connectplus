import React, { useRef, useState } from 'react';
import { Container, Typography, Card, Box, Avatar, Button, Grid, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';

// Dashboard-style card
const ProfileCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 2px 12px 0 rgba(80,120,200,0.08)',
  background: '#f0f6ff',
  maxWidth: 480,
  margin: '0 auto',
  transition: 'box-shadow 0.2s, transform 0.2s',
  '&:hover': {
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
    transform: 'translateY(-2px) scale(1.01)',
  },
}));

const mockUser = {
  username: 'johndoe',
  name: 'John',
  lastname: 'Doe',
  email: 'johndoe@example.com',
  avatar: '',
};

const Profile = () => {
  const [user, setUser] = useState(mockUser);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Avatar
                  src={avatarUrl || undefined}
                  alt={user.name}
                  sx={{ width: 96, height: 96, boxShadow: 2, border: '3px solid #fff', background: '#e3e6f0', fontSize: 40 }}
                >
                  {(!avatarUrl && user.name) ? user.name[0] : ''}
                </Avatar>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)', fontWeight: 600, borderRadius: 2, minWidth: 0, px: 2, py: 0.5, fontSize: '0.95rem' }}
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
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-1px' }}>Profile</Typography>
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
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">First Name</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{user.name}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Last Name</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{user.lastname}</Typography>
              </Grid>
            </Grid>
          </ProfileCard>
        </Fade>
      </Container>
    </>
  );
};

export default Profile; 