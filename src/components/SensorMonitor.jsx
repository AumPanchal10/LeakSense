import { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { ThermostatOutlined, AirOutlined, LocalFireDepartmentOutlined } from '@mui/icons-material';
import { serialService } from '../services/SerialService';
import GasLevelChart from './GasLevelChart';

const SensorCard = ({ icon, title, value, unit }) => (
  <Paper elevation={3} sx={{
    p: 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)'
    }
  }}>
    {icon}
    <Typography variant="h6" sx={{ my: 2 }}>{title}</Typography>
    <Typography variant="h4" color="primary.main">{value}</Typography>
    <Typography variant="body2" color="text.secondary">{unit}</Typography>
  </Paper>
);

const SensorMonitor = () => {
  const [sensorData, setSensorData] = useState({
    mq2: 0,
    mq135: 0,
    temperature: 0
  });

  useEffect(() => {
    const unsubscribe = serialService.onData((data) => {
      setSensorData(data);
    });

    return () => unsubscribe();
  }, []);

  const sensors = [
    {
      icon: <LocalFireDepartmentOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Gas Level (MQ-2)',
      value: sensorData.mq2.toFixed(2),
      unit: 'Ratio'
    },
    {
      icon: <AirOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Air Quality (MQ-135)',
      value: sensorData.mq135.toFixed(2),
      unit: 'Ratio'
    },
    {
      icon: <ThermostatOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Temperature',
      value: sensorData.temperature.toFixed(1),
      unit: '°C'
    }
  ];

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          Real-time Sensor Monitoring
        </Typography>
        <Grid container spacing={4}>
          {sensors.map((sensor, index) => (
            <Grid item xs={12} md={4} key={index}>
              <SensorCard {...sensor} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <GasLevelChart />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SensorMonitor;