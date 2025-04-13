import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Features from './pages/Features';
import Technical from './pages/Technical';
import Contact from './pages/Contact';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#fff'
    },
    secondary: {
      main: '#F50057',
      light: '#FF4081',
      dark: '#C51162',
      contrastText: '#fff'
    },
    background: {
      default: '#fafafa',
      paper: '#fff'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01562em'
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 600,
      letterSpacing: '-0.00833em'
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 400,
      letterSpacing: '0em'
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '0.00938em'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          scrollBehavior: 'smooth',
          transition: 'all 0.3s ease-in-out'
        },
        body: {
          overflowX: 'hidden'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
          },
          '&.MuiCard-root': {
            borderRadius: '16px',
            overflow: 'hidden'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '8px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 15px rgba(33,150,243,0.3)'
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#2196F3',
          boxShadow: '0 2px 10px 0 rgba(0,0,0,0.05)'
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/technical" element={<Technical />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;