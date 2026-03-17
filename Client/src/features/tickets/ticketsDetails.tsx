import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/loginLogic";
import UpdateTicket, { type ticketToUpdate } from "./updateTicket";
import DeleteTicket from "./deleteTicket";
import CommentsList from "../comments/commentsList";
import AddComment from "../comments/addComment";
// MUI Imports
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import type { Ticket } from "./ticketsList";



const TicketDetails = () => {
    const { state } = useAuth();
    const location = useLocation();
    const { ticket } = location.state || {};


    const [currentTicket, setCurrentTicket] = useState<Ticket>(ticket);

    useEffect(() => {
        if (currentTicket) {
    
            setCurrentTicket(currentTicket);

        }
    }, [currentTicket]);


    const handleUpdate = (updatedTicket: ticketToUpdate) => {

   const tic = updatedTicket as Ticket;




        setCurrentTicket(tic);
    };




if (!currentTicket) {
    return (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">
                לא נמצאו פרטי קריאה.
            </Typography>
        </Paper>
    );
}

return (
    <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
        {/* כותרת ופעולות ניהול */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
                <Typography variant="h4" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                    {currentTicket.subject}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    מזהה קריאה: #{currentTicket.id}
                </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
                {(state.role === 'admin' || state.role === 'agent') && <UpdateTicket id={ticket.id} onUpdate={handleUpdate} />}

                {(state.role === 'admin') && <DeleteTicket id={ticket.id} />}
            </Stack>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* פרטי סטטוס ותיאור */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    תיאור התקלה:
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', bgcolor: '#f9f9f9', p: 2, borderRadius: 1 }}>
                    {ticket.description}
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="subtitle2" color="textSecondary">סטטוס</Typography>
                        <Chip label={ticket.status_name} color="primary" variant="outlined" />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="textSecondary">עדיפות</Typography>
                        <Chip label={ticket.priority_name} color={ticket.priority_name === 'high' ? 'error' : 'warning'} />
                    </Box>
                </Stack>
            </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* אזור התגובות */}
        <Box sx={{ bgcolor: '#fafafa', p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                תגובות והתכתבות
            </Typography>
            <CommentsList id={ticket.id} />
            <Box sx={{ mt: 3 }}>
                <AddComment id={ticket.id} />
            </Box>
        </Box>
    </Paper>
);
}

export default TicketDetails;