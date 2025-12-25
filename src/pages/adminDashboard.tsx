import { Link } from "react-router-dom"


const adminDashboard=()=>{
    return(
        <>
                <Link to="../tickets">Tickets</Link>|{" "}
                <Link to="../users">administration users</Link>
        
    

        </>)
}

export default adminDashboard