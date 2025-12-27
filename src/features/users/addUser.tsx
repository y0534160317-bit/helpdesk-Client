import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../features/auth/loginLogic";
import { addUserCall } from "../../api/helpdeskApi";
// MUI Imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';

const schema = yup
    .object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        role: yup.string().oneOf(['admin', 'agent', 'customer']).required("Role is required"),
        password: yup.string().min(4, 'Password must be at least 4 chars').required('Password is required')
    })
    .required();

export interface AUser {
    name: string,
    email: string,
    role: string,
    password: string,
}

const AddUser = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const { state } = useAuth();

    const onSubmit = async (data: AUser) => {
        try {
            if (state.token === null) return;
            const response = await addUserCall(state.token, data);
            console.log("User added successfully:", response);
        } catch (error) {
            console.log("Adding user failed, please try again.");
            console.error(error);
        }
        console.log(data);
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom align="center">
                    Add User
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
                    
                    <TextField
                        fullWidth
                        label="Name"
                        margin="normal"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        select
                        fullWidth
                        label="Role"
                        margin="normal"
                        defaultValue=""
                        inputProps={register("role")}
                        error={!!errors.role}
                        helperText={errors.role?.message}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="agent">Agent</MenuItem>
                        <MenuItem value="customer">Customer</MenuItem>
                    </TextField>

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default AddUser;