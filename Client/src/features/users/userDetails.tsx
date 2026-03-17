import { useLocation } from "react-router-dom";
// MUI Imports
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';

const UserDetails = () => {
    const location = useLocation();
    const { user } = location.state || {};

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                    <PersonIcon />
                </Avatar>
                <Typography variant="h4" component="h2">
                    User Details
                </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />

            {user ? (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                            User ID
                        </Typography>
                        <Typography variant="h6">
                            {user.id}
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Name
                        </Typography>
                        <Typography variant="h6">
                            {user.name}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Status {/* לוגיקה מקורית: מציג אימייל */}
                        </Typography>
                        <Typography variant="body1">
                            {user.email}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Priority {/* לוגיקה מקורית: מציג תפקיד */}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                            {user.role}
                        </Typography>
                    </Grid>
                </Grid>
            ) : (
                <Typography variant="body1" color="error" align="center">
                    No user details available.
                </Typography>
            )}
        </Paper>
    );
}

export default UserDetails;