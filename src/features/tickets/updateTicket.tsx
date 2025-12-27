import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../auth/loginLogic";
import { getStatusesCall, getUsersCall, updateTicketCall } from "../../api/helpdeskApi";
// MUI Imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import type { Status } from "../statusesAndPriority/statusesList";
import StatusesList from "../statusesAndPriority/statusesList";
import setTicket from "./ticketsDetails";
import { useLocation } from "react-router-dom";

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
    const { state } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const [statuses, setStatuses] = useState<Status[]>([])

    useEffect(() => {
        const getStatuses = async () => {
            if (state.token === null) return;
            const allStatuses = await getStatusesCall(state.token);
            setStatuses(allStatuses);
        };
        getStatuses();
    }, [state.token]);

    const [users, setUsers] = useState<Status[]>([])

    useEffect(() => {
        const getUsers = async () => {
            if (state.token === null) return;
            const allUsers = await getUsersCall(state.token);
            setUsers(allUsers);
        };
        getUsers();
    }, [state.token]);

   



const onSubmit = async (data: ticketToUpdate) => {
    try {
        if (state.token === null) return;
        if (id === null) return;
        const response = await updateTicketCall(state.token, id, data);
        console.log("Ticket update successfully:", response);
        
    } catch (error) {
        console.log("Updating ticket failed, please try again.");
        console.error(error);
    }
    console.log(data);
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
                {statuses.length !== 0 ? (
                    statuses.map((status) => (
                        <MenuItem key={status.id} value={status.id}>
                            {status.name}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>
                        אין טיקטים
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
            {users.length !== 0 ? (
                users
                    .filter(user => user.role === "agent") // פילטר לסוכנים
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