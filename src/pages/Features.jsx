import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { SensorsOutlined, SettingsInputComponentOutlined, DataUsageOutlined, PrecisionManufacturingOutlined } from '@mui/icons-material';

const FeatureSection = ({ icon, title, description, specifications }) => (
  <Paper elevation={3} sx={{ p: 4, height: '100%', mb: 4 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
      <Typography variant="h5" sx={{ ml: 2 }}>{title}</Typography>
    </Box>
    <Typography variant="body1" color="text.secondary" paragraph>
      {description}
    </Typography>
    <List>
      {specifications.map((spec, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <SettingsInputComponentOutlined color="primary" />
          </ListItemIcon>
          <ListItemText primary={spec} />
        </ListItem>
      ))}
    </List>
  </Paper>
);

const Features = () => {
  const features = [
    {
      icon: <SensorsOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Gas Detection Sensors',
      description: 'High-precision sensors for comprehensive gas detection and monitoring.',
      specifications: [
        'MQ-2 sensor for LPG, smoke, and combustible gas detection',
        'MQ-135 sensor for air quality monitoring and CO2 detection',
        'LM35 temperature sensor for ambient temperature monitoring',
        'Calibrated for optimal sensitivity and accuracy'
      ]
    },
    {
      icon: <DataUsageOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Real-time Analytics',
      description: 'Advanced data processing for immediate insights and alerts.',
      specifications: [
        'Continuous real-time gas concentration monitoring',
        'Automated air quality index calculation',
        'Historical data tracking and analysis',
        'Customizable alert thresholds'
      ]
    },
    {
      icon: <PrecisionManufacturingOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'System Integration',
      description: 'Seamless integration capabilities for comprehensive safety solutions.',
      specifications: [
        'Compatible with existing safety systems',
        'Easy installation and maintenance',
        'Expandable sensor network',
        'Remote monitoring capabilities'
      ]
    }
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Features & Specifications
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 8 }}>
          Discover the advanced capabilities of LeakSense
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} key={index}>
              <FeatureSection {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;