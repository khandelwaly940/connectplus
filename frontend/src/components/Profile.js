import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const Profile = () => (
  <Container maxWidth="sm" sx={{ py: 6 }}>
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <Typography variant="body1">This is your profile page. You can display and edit your user information here.</Typography>
    </Paper>
  </Container>
);

export default Profile; 