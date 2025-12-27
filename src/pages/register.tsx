import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authorizeUserCall, registerUserCall } from "../api/helpdeskApi";
// MUI Imports
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const schema = yup
  .object({
    name: yup.string().required('שם הוא שדה חובה'),
    email: yup.string().email('כתובת אימייל לא תקינה').required('אימייל הוא שדה חובה'),
    password: yup.string().min(4, 'סיסמה חייבת להיות באורך 4 תווים לפחות').required('סיסמה היא שדה חובה'),
  })
  .required();

export interface RUser {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RUser) => {
    try {
      const response = await registerUserCall(data);
      const response2 = await authorizeUserCall({
        email: data.email,
        password: data.password
      });
      console.log("User registered successfully:", response);
      // כאן מומלץ להוסיף ניווט לדף הבית או הודעת הצלחה
    } catch (error) {
      console.log("Registration failed, please try again.");
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ marginTop: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          הרשמה למערכת
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="שם מלא"
            autoFocus
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="כתובת אימייל"
            autoComplete="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="סיסמה"
            type="password"
            id="password"
            autoComplete="new-password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            הירשם
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
