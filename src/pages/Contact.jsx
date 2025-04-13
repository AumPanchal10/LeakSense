import { Box, Container, Typography, Grid, Paper, TextField, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { EmailOutlined, LocationOnOutlined, PhoneOutlined } from '@mui/icons-material';

const ContactInfo = ({ icon, title, content }) => (
  <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center' }}>
    {icon}
    <Box sx={{ ml: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1" color="text.secondary">{content}</Typography>
    </Box>
  </Paper>
);

import { useState } from 'react';
import { sendEmail } from '../services/emailService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await sendEmail(formData);
    
    setSnackbar({
      open: true,
      message: result.message,
      severity: result.success ? 'success' : 'error'
    });

    if (result.success) {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }

    setLoading(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const contactInfo = [
    {
      icon: <EmailOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Email',
      content: 'info@leaksense.com'
    },
    {
      icon: <PhoneOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Phone',
      content: '+1 (555) 123-4567'
    },
    {
      icon: <LocationOnOutlined sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Address',
      content: '123 Tech Street, Innovation City, ST 12345'
    }
  ];

  return (
    <>
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 8 }}>
            Get in touch with our team
          </Typography>

          <Grid container spacing={4}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} md={4} key={index}>
                <ContactInfo {...info} />
              </Grid>
            ))}
          </Grid>

          <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
            <Typography variant="h4" gutterBottom>Send us a message</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    required
                    multiline
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} color="inherit" />}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Contact;