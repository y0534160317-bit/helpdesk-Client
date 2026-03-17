import { Outlet } from 'react-router-dom';
import Header from './components/header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// יצירת ערכת נושא נקייה ומודרנית
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // כחול נעים
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5', // רקע אפור בהיר לכל האפליקציה
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // ביטול אותיות גדולות אוטומטיות בכפתורים
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '20px',
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline /> 
      <Header />
      <Container component="main" maxWidth="lg">
        <Box sx={{ marginTop: 4, marginBottom: 4 }}>
          <Outlet />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;