import { Link as RouterLink, Outlet } from "react-router-dom";
// MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const AgentDashboard = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* אזור תוכן ראשי שמשתנה (Outlet) */}
            <Box sx={{ mb: 4, minHeight: '60vh' }}>
                <Outlet />
            </Box>

            {/* אזור ניווט קבוע לנציג */}
            <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#f5f5f5' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary" sx={{ mr: 2 }}>
                        Agent Dashboard
                    </Typography>
                </Box>
                <Button 
                    component={RouterLink} 
                    to="../tickets" 
                    variant="contained" 
                    startIcon={<ConfirmationNumberIcon />}
                >
                    Tickets Management
                </Button>
            </Paper>
        </Container>
    );
}

export default AgentDashboard;