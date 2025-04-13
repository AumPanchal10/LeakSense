import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Alert
} from '@mui/material';
import { authService } from '../services/authService';
import UserDashboard from '../components/UserDashboard';
import SensorMonitor from '../components/SensorMonitor';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let result;
      if (isRegistering) {
        result = await authService.register(formData.email, formData.password, formData.name);
      } else {
        result = await authService.login(formData.email, formData.password);
      }

      if (result.success) {
        setIsLoggedIn(true);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    const result = await authService.logout();
    if (result.success) {
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn) {
    return (
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button variant="outlined" onClick={handleLogout}>Logout</Button>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <SensorMonitor />
            </Grid>
            <Grid item xs={12}>
              <UserDashboard />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isRegistering ? 'Create Account' : 'Login'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          )}
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            margin="normal"
            required
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3 }}
          >
            {isRegistering ? 'Register' : 'Login'}
          </Button>

          <Button
            fullWidth
            color="primary"
            onClick={() => setIsRegistering(!isRegistering)}
            sx={{ mt: 2 }}
          >
            {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Dashboard;