import { Box, Container, Typography, Grid, Paper, Button, Stack } from '@mui/material';
import SensorMonitor from '../components/SensorMonitor';
import { SecurityOutlined, SpeedOutlined, NotificationsActiveOutlined, HealthAndSafetyOutlined, WarningAmberOutlined, CheckCircleOutlined } from '@mui/icons-material';

const Feature = ({ icon, title, description }) => (
  <Paper elevation={3} sx={{
    p: 3,
    height: 280,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
      transform: 'scale(1.02)'
    }
  }}>
    {icon}
    <Typography variant="h6" sx={{ my: 2 }}>{title}</Typography>
    <Typography variant="body1" color="text.secondary">{description}</Typography>
  </Paper>
);

const StatCard = ({ value, label }) => (
  <Paper elevation={3} sx={{
    p: 3,
    height: 180,
    textAlign: 'center',
    background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
      transform: 'scale(1.02)'
    }
  }}>
    <Typography variant="h3" color="primary.main" gutterBottom>
      {value}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      {label}
    </Typography>
  </Paper>
);

const Home = () => {
  const stats = [
    { value: '25%', label: 'of gas leaks go undetected in their early stages' },
    { value: '2.5M', label: 'gas-related incidents reported annually worldwide' },
    { value: '60%', label: 'reduction in response time with smart detection' }
  ];

  const features = [
    {
      icon: <SecurityOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Comprehensive Gas Detection',
      description: 'Advanced sensors for detecting multiple types of gases including LPG, smoke, and CO2'
    },
    {
      icon: <SpeedOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Real-time Monitoring',
      description: 'Continuous monitoring with instant updates on gas levels and air quality'
    },
    {
      icon: <NotificationsActiveOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Smart Alerts',
      description: 'Immediate notifications when gas levels exceed safety thresholds'
    },
    {
      icon: <HealthAndSafetyOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Air Quality Index',
      description: 'Real-time AQI calculations for comprehensive air quality assessment'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        py: 12,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/src/assets/hero-bg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8,
          zIndex: -1
        }
      }}>
        <Container maxWidth="lg">
          <Box sx={{
              textAlign: 'center',
              mb: 8,
              '& h1': {
                animation: 'fadeInUp 0.8s ease-out',
                '@keyframes fadeInUp': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(20px)'
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)'
                  }
                }
              }
            }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to LeakSense
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              Advanced Gas Detection System for a Safer Environment
            </Typography>
            <Button variant="contained" size="large" sx={{ mt: 2 }}>
              Learn More
            </Button>
          </Box>

          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{
                  transform: 'translateY(0)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)'
                  }
                }}>
                  <StatCard {...stat} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Problem Statement */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <WarningAmberOutlined sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h3" gutterBottom>
                  The Challenge
                </Typography>
                <Typography variant="body1" paragraph>
                  Traditional gas detection systems often fail to provide early warnings, leading to potential hazards and costly damages. Manual monitoring and delayed responses put lives and assets at risk.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <CheckCircleOutlined sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h3" gutterBottom>
                  Our Solution
                </Typography>
                <Typography variant="body1" paragraph>
                  LeakSense combines advanced sensor technology with real-time monitoring to provide immediate alerts and comprehensive gas detection. Our system ensures 24/7 protection with automated responses and detailed analytics.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sensor Monitor Section */}
      <SensorMonitor />

      {/* Features Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom>
            Key Features
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Discover how LeakSense revolutionizes gas detection and safety
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{
                  opacity: 0,
                  animation: 'fadeIn 0.5s ease-out forwards',
                  animationDelay: `${index * 0.2}s`,
                  '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'translateY(20px)' },
                    to: { opacity: 1, transform: 'translateY(0)' }
                  }
                }}>
                  <Feature {...feature} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;