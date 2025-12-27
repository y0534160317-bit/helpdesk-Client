import { Link as RouterLink } from "react-router-dom";
// MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CustomerDashboard = () => {
    return (
        <Box sx={{ flexGrow: 1, mt: 4 }}>
            <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4, textAlign: 'center' }}>
                אזור אישי - לקוח
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {/* כרטיס הקריאות שלי */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card elevation={4} sx={{ height: '100%' }}>
                        <CardActionArea 
                            component={RouterLink} 
                            to="/tickets" 
                            sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                        >
                            <PlaylistAddCheckIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    הקריאות שלי
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    צפה בסטטוס הקריאות שפתחת והתעדכן בתגובות הצוות.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                {/* כרטיס פתיחת קריאה חדשה */}
                {/* <Grid item xs={12} sm={6} md={4}> */}
                    <Card elevation={4} sx={{ height: '100%' }}>
                        <CardActionArea 
                            component={RouterLink} 
                            to="/newticket" 
                            sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                        >
                            <AddCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    פתח קריאה חדשה
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    נתקלת בבעיה? פתח קריאת שירות חדשה ונטפל בה בהקדם.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                {/* </Grid> */}
            </Grid>
        </Box>
    );
}

export default CustomerDashboard;
