import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { BuildOutlined, MemoryOutlined, StorageOutlined, DeveloperBoardOutlined } from '@mui/icons-material';

const TechnicalSpec = ({ icon, title, description }) => (
  <Paper elevation={3} sx={{ p: 4, height: '100%', mb: 4 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon}
      <Typography variant="h6" sx={{ ml: 2 }}>{title}</Typography>
    </Box>
    <Typography variant="body1" color="text.secondary">
      {description}
    </Typography>
  </Paper>
);

const Technical = () => {
  const specifications = [
    {
      icon: <BuildOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Hardware Components',
      description: 'LeakSense utilizes high-quality MQ-2 and MQ-135 gas sensors, paired with LM35 temperature sensors for accurate environmental monitoring. The system is built on the Arduino platform for reliable performance.'
    },
    {
      icon: <MemoryOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Processing Unit',
      description: 'Powered by a 32-bit microcontroller with built-in ADC for precise analog sensor readings. Features include real-time data processing and advanced filtering algorithms for accurate gas detection.'
    },
    {
      icon: <StorageOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Data Management',
      description: 'Implements efficient data logging with local storage capability. Supports data export in multiple formats and features a robust database system for historical data analysis.'
    },
    {
      icon: <DeveloperBoardOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Connectivity',
      description: 'Equipped with Wi-Fi capability for remote monitoring and control. Supports multiple communication protocols including MQTT for real-time data transmission and system integration.'
    }
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Technical Specifications
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 8 }}>
          Explore the technical details of LeakSense
        </Typography>

        <Grid container spacing={4}>
          {specifications.map((spec, index) => (
            <Grid item xs={12} key={index}>
              <TechnicalSpec {...spec} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Technical;