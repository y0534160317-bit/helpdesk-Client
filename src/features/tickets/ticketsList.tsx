import {  useEffect, useState } from "react"
import { useAuth } from "../auth/loginLogic"
import { getTicketByIdCall, getTicketsCall } from "../../api/helpdeskApi";
import { Link, useNavigate } from "react-router-dom";

export interface Ticket {
    id: number,
    subject: string,
    description: string,
    status_id: number | null,
    priority_id: number | null,
    status_name: string | null,
    priority_name: string ,
    created_by: number|null,
    assigned_to: number | null,
    created_at: string|null,
    updated_at: string | null
}



const ticketsList= () => {
    const { state } = useAuth()

    const [allTickets, setallTickets] = useState<Ticket[]>([])

useEffect(() => {
    const getTickets = async () => {
        if (state.token === null) return;
        setallTickets(await getTicketsCall(state.token));
    }
    getTickets();
}, [state.token]); 


const navigate = useNavigate();

    return (
        <>
            <h5>Tickets List Page===============================</h5>
            <div>
                {allTickets.length!=0?(
            <ul>
                {

                    allTickets.map((ticket: Ticket) => <li key={ticket.id}>
                        {ticket.subject}
                        {ticket.status_name}
                        {ticket.description}
                         <Link to={""}>
                        <button onClick={  async()=>{ 
                                if(state.token===null)return
                                if(ticket===null)return
                                const tic = await getTicketByIdCall(state.token,ticket.id);
                                console.log(tic)
                                navigate(`/tickets/${ticket.id}`, { state: { ticket: tic } });
                              }}>ticket details</button></Link>
                    </li>)

                }
            </ul>):
            <h3>"אין טיקטים</h3>}
            </div>
        </>
    )

}
export default ticketsList