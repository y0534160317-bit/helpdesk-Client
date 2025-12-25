import { Link } from "react-router-dom"

const customerDashboard=()=>{
    return(
        <>
                <Link to="../tickets">Tickets</Link>|{" "}
                
                <Link to="../newticket">Add Ticket</Link>
     <p>CustomerDashboard</p>
        </>)
}

export default customerDashboard