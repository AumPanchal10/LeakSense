import { useEffect, useRef } from 'react';
import { Box, Paper } from '@mui/material';
import Chart from 'chart.js/auto';
import { serialService } from '../services/SerialService';

const GasLevelChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Initialize the chart
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Gas Level (MQ-2)',
              data: [],
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.4,
              fill: false
            },
            {
              label: 'Air Quality (MQ-135)',
              data: [],
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.4,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 0
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Sensor Reading'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Time'
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Real-time Gas Level Monitoring',
              font: {
                size: 16
              }
            },
            legend: {
              position: 'top'
            }
          }
        }
      });

      // Subscribe to sensor data updates
      const unsubscribe = serialService.onData((data) => {
        const chart = chartInstance.current;
        const now = new Date().toLocaleTimeString();

        // Add new data point
        chart.data.labels.push(now);
        chart.data.datasets[0].data.push(data.mq2);
        chart.data.datasets[1].data.push(data.mq135);

        // Keep only last 20 data points
        if (chart.data.labels.length > 20) {
          chart.data.labels.shift();
          chart.data.datasets.forEach(dataset => dataset.data.shift());
        }

        chart.update();
      });

      return () => {
        unsubscribe();
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2, height: '400px' }}>
      <Box sx={{ position: 'relative', height: '100%' }}>
        <canvas ref={chartRef} />
      </Box>
    </Paper>
  );
};

export default GasLevelChart;