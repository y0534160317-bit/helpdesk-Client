import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../features/auth/loginLogic";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const Header = () => {
  const { state } = useAuth();

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
      <Toolbar>
        <Typography variant="h6" color="primary" noWrap sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          HelpDesk Pro
        </Typography>
        <nav>
          <Button component={RouterLink} to="/dashboard" sx={{ mx: 1 }}>
            Dashboard
          </Button>
          
          {!state.isLogedIn && (
            <Button component={RouterLink} to="/login" variant="outlined" sx={{ mx: 1 }}>
              Login
            </Button>
          )}

          {state.isLogedIn && (
            <Button component={RouterLink} to="/logout" color="error" sx={{ mx: 1 }}>
              Logout
            </Button>
          )}

          <Button component={RouterLink} to="/register" sx={{ mx: 1 }}>
            Register
          </Button>

          {state.role === 'admin' && (
            <Button component={RouterLink} to="/admin" variant="contained" color="primary" sx={{ mx: 1 }}>
              Admin Panel
            </Button>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;