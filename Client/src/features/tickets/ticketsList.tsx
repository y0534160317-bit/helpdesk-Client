import { useEffect, useState } from "react";
import { useAuth } from "../auth/loginLogic";
import { getTicketByIdCall, getTicketsCall } from "../../api/helpdeskApi";
import { useNavigate } from "react-router-dom";
// MUI Imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

export interface Ticket {
    id: number,
    subject: string,
    description: string,
    status_id: number | null,
    priority_id: number | null,
    status_name: string | null,
    priority_name: string,
    created_by: number | null,
    assigned_to: number | null,
    created_at: string | null,
    updated_at: string | null
}

const TicketsList = () => {
    const { state } = useAuth();
    const [allTickets, setallTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const getTickets = async () => {
            if (state.token === null) return;
            setallTickets(await getTicketsCall(state.token));
        }
        getTickets();
    }, [state.token]);

    const navigate = useNavigate();

    // פונקציית עזר לצבעי עדיפות
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'error';
            case 'middle': return 'warning';
            case 'low': return 'success';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4, textAlign: 'center' }}>
                רשימת קריאות שירות
            </Typography>
            
            {allTickets.length !== 0 ? (
                <TableContainer component={Paper} elevation={2}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ bgcolor: '#f0f0f0' }}>
                            <TableRow>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>נושא</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>סטטוס</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>עדיפות</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>תיאור קצר</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allTickets.map((ticket: Ticket) => (
                                <TableRow
                                    key={ticket.id}
                                    sx={{ '&:last-child td, &:last-child th': {QH: 0}, '&:hover': { bgcolor: '#fafafa' } }}
                                >
                                    <TableCell component="th" scope="row" align="right">
                                        {ticket.subject}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip label={ticket.status_name || 'חדש'} variant="outlined" size="small" />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip 
                                            label={ticket.priority_name} 
                                            color={getPriorityColor(ticket.priority_name) as any} 
                                            size="small" 
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        {ticket.description.substring(0, 50)}...
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button 
                                            variant="contained" 
                                            size="small"
                                            onClick={async () => {
                                                if (state.token === null) return;
                                                if (ticket === null) return;
                                                const tic = await getTicketByIdCall(state.token, ticket.id);
                                                console.log(tic);
                                                navigate(`/tickets/${ticket.id}`, { state: { ticket: tic } });
                                            }}
                                        >
                                            פרטים נוספים
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="h6" align="center" color="textSecondary">
                    אין טיקטים במערכת
                </Typography>
            )}
        </Box>
    );
}
export default TicketsList;