import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const AppFooter = ({ mt = { xs: 4, md: 6 }, compact = false, maxWidth = 'lg' }) => {
  return (
    <Box
      component="footer"
      sx={{
        mt,
        borderTop: compact ? 'none' : '1px solid rgba(25, 118, 210, 0.14)',
        background: compact
          ? 'transparent'
          : 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(245,250,255,0.95) 100%)',
        backdropFilter: compact ? 'none' : 'blur(6px)',
      }}
    >
      <Container maxWidth={maxWidth} sx={{ py: compact ? { xs: 1.5, sm: 2 } : { xs: 2.5, sm: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © 2026 Connect+ All Rights Reserved.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Built for practical learning outcomes.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AppFooter;
