import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/loginLogic";
import { deleteTicketCall } from "../../api/helpdeskApi";



const deleteTicket=({ id }: { id: number | null })=>{

const navigate = useNavigate();

const {state}=useAuth()
return(
<button onClick={async ()=>{
    if(state.token===null)return
    if(id===null)return;
    const response = await deleteTicketCall(state.token,id);
                console.log("Ticket update successfully:", response);
    navigate("../tickets");
}}>
מחיקת טיקט
</button>)
}
export default deleteTicket