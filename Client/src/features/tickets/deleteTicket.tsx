import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // ✅ חדש
import { deleteTicket } from "../../store/slices/ticketsSlice"; // ✅ חדש
import type { RootState } from "../../store/store"; // ✅ חדש
import { deleteTicketCall } from "../../api/helpdeskApi";
// MUI Imports
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteTicket = ({ id }: { id: number | null }) => {
    const dispatch = useDispatch(); // ✅ חדש
    const navigate = useNavigate();
    const { token } = useSelector((state: RootState) => state.auth); // ✅ חדש: קרא token מ-Redux

    return (
        <Button 
            variant="contained" 
            color="error" 
            startIcon={<DeleteIcon />}
            onClick={async () => {
                if (token === null) return; // ✅ שינוי: קרא מ-Redux
                if (id === null) return;
                const response = await deleteTicketCall(token, id);
                // ✅ חדש: dispatch ל-Redux כדי למחוק הכרטיס
                dispatch(deleteTicket(id));
                console.log("Ticket deleted successfully:", response);
                navigate("../tickets");
            }}
        >
            מחיקה טיקט
        </Button>
    );
}

export default DeleteTicket;