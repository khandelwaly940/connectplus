import React from 'react';
import { useState } from 'react';
import { Box, Typography, TextField, Paper, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

<PageBackground>
  <Box sx={{ textAlign: 'center', py: 4 }} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
    <LogoText sx={{ color: 'white' }}>Connect+</LogoText>
  </Box>
</PageBackground> 