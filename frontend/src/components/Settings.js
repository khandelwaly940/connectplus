import React, { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { logout } from '../store/slices/authSlice';

const SETTINGS_KEY = 'connectplus-settings';

const loadSettings = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    return {
      showDisplayName: parsed.showDisplayName ?? true,
      productUpdates: parsed.productUpdates ?? true,
      reminderEmails: parsed.reminderEmails ?? false,
    };
  } catch {
    return {
      showDisplayName: true,
      productUpdates: true,
      reminderEmails: false,
    };
  }
};

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [settings, setSettings] = useState(loadSettings);
  const [saved, setSaved] = useState(false);

  const hasChanges = useMemo(() => {
    const previous = loadSettings();
    return JSON.stringify(previous) !== JSON.stringify(settings);
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const saveSettings = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setSaved(true);
  };

  const clearLocalPreferences = () => {
    localStorage.removeItem(SETTINGS_KEY);
    setSettings(loadSettings());
    setSaved(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: { xs: 2, sm: 6 } }}>
        <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.6rem', sm: '2.125rem' }, fontWeight: 800 }}>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Manage local preferences for this browser session.
          </Typography>

          {saved && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Settings saved locally on this device.
            </Alert>
          )}

          <Stack spacing={2.5} sx={{ mb: 3 }}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Display Name Visibility</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Show your display name in profile and account surfaces.
                  </Typography>
                </Box>
                <Switch
                  checked={settings.showDisplayName}
                  onChange={(e) => updateSetting('showDisplayName', e.target.checked)}
                />
              </Box>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Product Updates</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Placeholder preference for product announcements.
                  </Typography>
                </Box>
                <Switch
                  checked={settings.productUpdates}
                  onChange={(e) => updateSetting('productUpdates', e.target.checked)}
                />
              </Box>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Reminder Emails</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Placeholder until server-side notification preferences are added.
                  </Typography>
                </Box>
                <Switch
                  checked={settings.reminderEmails}
                  onChange={(e) => updateSetting('reminderEmails', e.target.checked)}
                />
              </Box>
            </Paper>
          </Stack>

          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 4 }}>
            <Button variant="contained" onClick={saveSettings} disabled={!hasChanges}>
              Save Preferences
            </Button>
            <Button variant="outlined" color="inherit" onClick={clearLocalPreferences}>
              Reset Local Preferences
            </Button>
          </Box>

          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'error.light', background: '#fffafa' }}>
            <Typography variant="h6" color="error" sx={{ fontWeight: 700, mb: 1 }}>
              Danger Zone
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Use this if you want to end your current session immediately.
            </Typography>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Paper>
        </Paper>
      </Container>
    </>
  );
};

export default Settings;
