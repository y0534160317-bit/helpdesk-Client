import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../auth/loginLogic";
import { addTicketCall } from "../../api/helpdeskApi";
import { useNavigate } from "react-router-dom";
// MUI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';

export interface TicketToAdd {
    subject?: string,
    description?: string,
    priority_name?: string,
}

const schema = yup
    .object({
        subject: yup.string().max(100, 'מקסימום 100 תווים').required('נושא הוא שדה חובה'),
        description: yup.string().min(20, 'מינימום 20 תווים').required('תיאור הוא שדה חובה'),
        priority_name: yup.string().oneOf(['low', 'middle', 'high'], 'בחר עדיפות תקינה').required("יש לבחור עדיפות"),
    })
    .required();

const AddTicket = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const { state } = useAuth();

    const onSubmit = async (data: TicketToAdd) => {
        try {
            if (state.token === null) return;
            const response = await addTicketCall(state.token, data);
            console.log("Ticket added successfully:", response);
            navigate("/dashboard", { replace: true });
        } catch (error) {
            console.log("Adding ticket failed, please try again.");
            console.error(error);
        }
        console.log(data);
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom align="center">
                    פתיחת קריאה חדשה
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
                    
                    <TextField
                        fullWidth
                        label="נושא הקריאה"
                        margin="normal"
                        {...register("subject")}
                        error={!!errors.subject}
                        helperText={errors.subject?.message}
                    />

                    <TextField
                        fullWidth
                        label="תיאור התקלה"
                        margin="normal"
                        multiline
                        rows={4}
                        {...register("description")}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />

                    <TextField
                        select
                        fullWidth
                        label="עדיפות"
                        margin="normal"
                        defaultValue=""
                        inputProps={register("priority_name")}
                        error={!!errors.priority_name}
                        helperText={errors.priority_name?.message}
                    >
                        <MenuItem value="low">נמוכה (Low)</MenuItem>
                        <MenuItem value="middle">בינונית (Middle)</MenuItem>
                        <MenuItem value="high">גבוהה (High)</MenuItem>
                    </TextField>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3 }}
                    >
                        שלח קריאה
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default AddTicket;