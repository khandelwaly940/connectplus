import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const Settings = () => (
  <Container maxWidth="sm" sx={{ py: 6 }}>
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <Typography variant="body1">This is your settings page. You can update your preferences here.</Typography>
    </Paper>
  </Container>
);

export default Settings; 