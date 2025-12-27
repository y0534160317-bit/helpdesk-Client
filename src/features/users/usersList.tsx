import { useEffect, useState } from "react";
import { getUsersByIdCall, getUsersCall } from "../../api/helpdeskApi";
import { useAuth } from "../../features/auth/loginLogic";
import { Link, useNavigate } from "react-router-dom";
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
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export interface User {
    id: number,
    name: string,
    email: string,
    role: string,
}

const UsersList = () => {
    const { state } = useAuth();
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            if (state.token === null) return;
            setAllUsers(await getUsersCall(state.token));
        }
        getUsers();
    }, [state.token]);

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'admin': return <AdminPanelSettingsIcon color="error" />;
            case 'agent': return <SupportAgentIcon color="primary" />;
            default: return <PersonIcon color="action" />;
        }
    };

    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h2">
                    ניהול משתמשים
                </Typography>
                <Button 
                    variant="contained" 
                    startIcon={<PersonAddIcon />}
                    onClick={async () => {
                        if (state.token === null) return;
                        navigate(`/users/adduser`);
                    }}
                >
                    הוספת משתמש
                </Button>
            </Box>

            {allUsers.length !== 0 ? (
                <TableContainer component={Paper} elevation={2}>
                    <Table sx={{ minWidth: 650 }} aria-label="users table">
                        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell align="right">שם מלא</TableCell>
                                <TableCell align="right">אימייל</TableCell>
                                <TableCell align="center">תפקיד</TableCell>
                                <TableCell align="center">פעולות</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allUsers.map((user: User) => (
                                <TableRow
                                    key={user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#fafafa' } }}
                                >
                                    <TableCell component="th" scope="row" align="right" sx={{ fontWeight: 'medium' }}>
                                        {user.name}
                                    </TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                            {getRoleIcon(user.role)}
                                            <Typography variant="body2">{user.role}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button 
                                            variant="outlined" 
                                            size="small"
                                            onClick={async () => {
                                                if (state.token === null) return;
                                                if (user === null) return;
                                                const usr = await getUsersByIdCall(state.token, user.id);
                                                navigate(`/users/${user.id}`, { state: { user: usr } });
                                            }}
                                        >
                                            פרטי משתמש
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="h6" align="center" color="textSecondary" sx={{ mt: 4 }}>
                    אין משתמשים במערכת
                </Typography>
            )}
        </Box>
    );
}
export default UsersList;