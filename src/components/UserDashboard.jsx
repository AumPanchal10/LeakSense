import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Slider,
  Button,
  Alert
} from '@mui/material';
import { NotificationsActive, Settings } from '@mui/icons-material';
import { authService } from '../services/authService';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    notifications: true,
    alertThresholds: {
      mq2: 400,
      mq135: 300,
      temperature: 30
    }
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const loadUserProfile = async () => {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        const { success, profile } = await authService.getUserProfile(currentUser.uid);
        if (success && profile.settings) {
          setUser(currentUser);
          setSettings(profile.settings);
        }
      }
    };

    loadUserProfile();
  }, []);

  const handleSettingsChange = async () => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const { success, error } = await authService.updateUserSettings(currentUser.uid, settings);
      if (success) {
        setMessage({ type: 'success', text: 'Settings updated successfully!' });
      } else {
        setMessage({ type: 'error', text: error || 'Failed to update settings' });
      }
    }
  };

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" align="center">
          Please log in to access your dashboard
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>

      {message.text && (
        <Alert severity={message.type} sx={{ mb: 3 }} onClose={() => setMessage({ type: '', text: '' })}>
          {message.text}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <NotificationsActive sx={{ mr: 2 }} />
              <Typography variant="h6">Notification Settings</Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications}
                  onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                />
              }
              label="Enable Notifications"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Settings sx={{ mr: 2 }} />
              <Typography variant="h6">Alert Thresholds</Typography>
            </Box>
            <Box sx={{ px: 2 }}>
              <Typography gutterBottom>Gas Level (MQ-2)</Typography>
              <Slider
                value={settings.alertThresholds.mq2}
                onChange={(e, value) => setSettings({
                  ...settings,
                  alertThresholds: { ...settings.alertThresholds, mq2: value }
                })}
                min={0}
                max={1000}
                valueLabelDisplay="auto"
              />

              <Typography gutterBottom sx={{ mt: 2 }}>Air Quality (MQ-135)</Typography>
              <Slider
                value={settings.alertThresholds.mq135}
                onChange={(e, value) => setSettings({
                  ...settings,
                  alertThresholds: { ...settings.alertThresholds, mq135: value }
                })}
                min={0}
                max={1000}
                valueLabelDisplay="auto"
              />

              <Typography gutterBottom sx={{ mt: 2 }}>Temperature (°C)</Typography>
              <Slider
                value={settings.alertThresholds.temperature}
                onChange={(e, value) => setSettings({
                  ...settings,
                  alertThresholds: { ...settings.alertThresholds, temperature: value }
                })}
                min={0}
                max={50}
                valueLabelDisplay="auto"
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSettingsChange}
            >
              Save Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDashboard;