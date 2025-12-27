import { Link as RouterLink } from "react-router-dom";
// MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PeopleIcon from '@mui/icons-material/People';
import Box from '@mui/material/Box';

const AdminDashboard = () => {
    return (
        <Box sx={{ flexGrow: 1, mt: 4 }}>
            <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4, textAlign: 'center' }}>
                לוח בקרה - מנהל מערכת
            </Typography>
            
            <Grid container spacing={4} justifyContent="center">
                {/* כרטיס ניהול טיקטים */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card elevation={4} sx={{ height: '100%' }}>
                        <CardActionArea 
                            component={RouterLink} 
                            to="/tickets" // הנחתי שזה הנתיב לטיקטים, אם זה ../tickets תשנה בהתאם
                            sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                        >
                            <ConfirmationNumberIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    ניהול קריאות (Tickets)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    צפייה בכל הקריאות במערכת, טיפול בבקשות, עדכון סטטוסים ומחיקת קריאות.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                {/* כרטיס ניהול משתמשים */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card elevation={4} sx={{ height: '100%' }}>
                        <CardActionArea 
                            component={RouterLink} 
                            to="/users" 
                            sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                        >
                            <PeopleIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    ניהול משתמשים
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    הוספת משתמשים חדשים, עריכת פרטים, צפייה ברשימת המשתמשים וניהול הרשאות.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminDashboard;