import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateTicket } from "../../store/slices/ticketsSlice";
import { setStatuses } from "../../store/slices/statusesSlice";
import { setUsers } from "../../store/slices/usersSlice";
import type { RootState } from "../../store/store";
import type { Ticket } from "../../store/slices/ticketsSlice";
import { getStatusesCall, getUsersCall, updateTicketCall } from "../../api/helpdeskApi";
// MUI Imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useEffect } from "react";

export interface ticketToUpdate {
    status_id: number | null,
    priority_id: number | null,
    assigned_to: number | null
}

type UpdateTicketProps = {
    id: number | null;
    onUpdate: (updatedTicket: ticketToUpdate) => void;
};

const schema = yup
    .object({
        status_id: yup.number().required('Status ID is required'),
        priority_id: yup.number().required('Priority ID is required'),
        assigned_to: yup.number().required('Assigned To (Priority logic) is required'),
    })
    .required();

const UpdateTicket = ({ id, onUpdate }: UpdateTicketProps) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.auth);
    const { allStatuses } = useSelector((state: RootState) => state.statuses);
    const { allUsers } = useSelector((state: RootState) => state.users);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const fetchStatuses = async () => {
            if (!token) return;
            const stats = await getStatusesCall(token);
            dispatch(setStatuses(stats));
        };
        fetchStatuses();
    }, [token, dispatch]);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) return;
            const users = await getUsersCall(token);
            dispatch(setUsers(users));
        };
        fetchUsers();
    }, [token, dispatch]);

    const onSubmit = async (data: ticketToUpdate) => {
        try {
            if (token === null) return; // ✅ שינוי: קרא מ-Redux
            if (id === null) return;
            const response = await updateTicketCall(token, id, data);
            // ✅ חדש: dispatch ל-Redux כדי לעדכן כרטיס מיד
            dispatch(updateTicket(response as Ticket));
            onUpdate(data); // גם קוראים parents update
            console.log("Ticket update successfully:", response);
        } catch (error) {
            console.log("Updating ticket failed, please try again.");
            console.error(error);
        }
    }

return (
    <Paper elevation={2} sx={{ p: 3, mt: 2, bgcolor: '#f9f9f9' }}>
        <Typography variant="h6" gutterBottom>
            Update Ticket
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>


            <TextField
                select
                label="Status"
                fullWidth
                size="small"
                defaultValue="1"
                {...register("status_id")}
                error={!!errors.status_id}
                helperText={errors.status_id?.message}
            >
                {allStatuses.length !== 0 ? (
                    allStatuses.map((status) => (
                        <MenuItem key={status.id} value={status.id}>
                            {status.name}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>
                        אין סטטוסים
                    </MenuItem>
                )}
            </TextField>
            <TextField
                select
                label="Priority"
                type="number"
                fullWidth
                size="small"
                defaultValue=""
                inputProps={register("priority_id")}
                error={!!errors.assigned_to}
                helperText={errors.assigned_to?.message}
            >
                <MenuItem value="1">low</MenuItem>
                <MenuItem value="2">middle</MenuItem>
                <MenuItem value="3">high</MenuItem>
            </TextField>
            {/* לוגיקה מקורית: תווית priority, משתנה assigned_to, ערכים 1,2,3 */}

             <TextField
            select
            label="Assigned To"
            fullWidth
            size="small"
            defaultValue="1"
            {...register("assigned_to")}
            error={!!errors.assigned_to}
            helperText={errors.assigned_to?.message}
        >
            {allUsers.length !== 0 ? (
                allUsers
                    .filter(user => user.role === "agent")
                    .map(user => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.name}
                        </MenuItem>
                    ))
            ) : (
                <MenuItem disabled>
                    אין סוכנים
                </MenuItem>
            )}
        </TextField>
            <Button type="submit" variant="contained" color="primary">
                Update
            </Button>
        </Box>
    </Paper>
);
}

export default UpdateTicket;