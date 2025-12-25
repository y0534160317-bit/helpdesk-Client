

import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/loginLogic";
import UpdateTicket from "./updateTicket";
import DeleteTicket from "./deleteTicket";
import CommentsList from "../comments/commentsList";
import AddComment from "../comments/addComment";


const ticketDetails = () => {
    const { state } = useAuth();

    const location = useLocation();
    const { ticket } = location.state || {};

    return (
        <>
        {(state.role==='admin')&&<DeleteTicket id={ticket.id}/>}
        {(state.role==='admin'||state.role==='agent') && <UpdateTicket id={ticket.id} />}
            <h2>Ticket Details</h2>
            {ticket ? (
                <div>
                    <h3>{ticket.subject}</h3>
                    <p>{ticket.description}</p>
                    <p>Status: {ticket.status_name}</p>
                    <p>Priority: {ticket.priority_name}</p>
                    
                    <CommentsList id={ticket.id} />
                    <AddComment id={ticket.id} />
                </div>
           
            ) : (
                <p>No ticket details available.</p>
            )}

        </>
    );
}

export default ticketDetails;