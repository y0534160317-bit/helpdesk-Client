import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/loginLogic";
import { deleteTicketCall } from "../../api/helpdeskApi";
// MUI Imports
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteTicket = ({ id }: { id: number | null }) => {
    const navigate = useNavigate();
    const { state } = useAuth();

    return (
        <Button 
            variant="contained" 
            color="error" 
            startIcon={<DeleteIcon />}
            onClick={async () => {
                if (state.token === null) return;
                if (id === null) return;
                const response = await deleteTicketCall(state.token, id);
                console.log("Ticket update successfully:", response);
                navigate("../tickets");
            }}
        >
            מחיקת טיקט
        </Button>
    );
}

export default DeleteTicket;