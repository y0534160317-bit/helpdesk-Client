import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { Ticket } from "../../store/slices/ticketsSlice";
import UpdateTicket from "./updateTicket";
import DeleteTicket from "./deleteTicket";
import CommentsList from "../comments/commentsList";
import AddComment from "../comments/addComment";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const TicketDetails = () => {
    const { id } = useParams<{ id: string }>(); // ✅ חדש: קסטי id מ-URL params
    const { allTickets } = useSelector((state: RootState) => state.tickets); // ✅ חדש: קרא כרטיסים מ-Redux
    const { role } = useSelector((state: RootState) => state.auth); // ✅ חדש: קרא role מ-Redux

    // ✅ גמ. מצא כרטיס ב-Redux לפי ID
    const currentTicket = allTickets.find(t => t.id === Number(id)) as Ticket | undefined;

    if (!currentTicket) {
        return (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="textSecondary">
                    לא נמצאו פרטי קריאה.
                </Typography>
            </Paper>
        );
    }

    const handleUpdate = () => {
        // עדכון סאטומטי דרך Redux - אין צורך בעדכון יד
    };

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
                        {(role === 'admin' || role === 'agent') && <UpdateTicket id={currentTicket.id} onUpdate={handleUpdate} />}
                        {(role === 'admin') && <DeleteTicket id={currentTicket.id} />}
                    </Stack>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        פרטים נוספים
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3, mb: 4 }}>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                תיאור התקלה:
                            </Typography>
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', bgcolor: '#f9f9f9', p: 2, borderRadius: 1 }}>
                                {currentTicket.description}
                            </Typography>
                        </Box>
                        <Box>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="textSecondary">סטטוס</Typography>
                                    <Chip label={currentTicket.status_name} color="primary" variant="outlined" />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="textSecondary">עדיפות</Typography>
                                    <Chip label={currentTicket.priority_name} color={currentTicket.priority_name === 'high' ? 'error' : 'warning'} />
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* אזור התגובות */}
                <Box sx={{ bgcolor: '#fafafa', p: 3, borderRadius: 2 }}>
                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                        תגובות והתכתבות
                    </Typography>
                    <CommentsList id={currentTicket.id} />
                    <Box sx={{ mt: 3 }}>
                        <AddComment id={currentTicket.id} />
                    </Box>
                </Box>
            </Paper>
        );
};

export default TicketDetails;