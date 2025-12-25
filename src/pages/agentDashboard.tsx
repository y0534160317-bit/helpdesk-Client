import { Link, Outlet } from "react-router-dom"


const agentDashboard=()=>{
    
    
    return(
        <>
        <Outlet/>

        <Link to="../tickets">Tickets</Link>
     <p>AgentDashboard</p>
        </>)
}

export default agentDashboard