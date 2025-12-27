import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Register from "../pages/register";
import { useAuth } from "../features/auth/loginLogic";
import AdminDashboard from "../pages/adminDashboard";
import TicketsList from "../features/tickets/ticketsList";
import AddTicket from "../features/tickets/addTicket";
import TicketDetails from "../features/tickets/ticketsDetails";
import UsersList from "../features/users/usersList";
import UserDetails from "../features/users/userDetails";
import AgentDashboard from "../pages/agentDashboard";
import CustomerDashboard from "../pages/customerDashboard";
import AddUser from "../features/users/addUser"
import logoutState from "../pages/logoutState";
import LogoutState from "../pages/logoutState";

const RoleToDash = () => {
    const { state } = useAuth()
    switch (state.role) {
        case 'admin': return <AdminDashboard />
        case 'agent': return <AgentDashboard />
        case 'customer': return <CustomerDashboard />
        default: return <App/>
    }
}

const Logout=()=>{
    localStorage.removeItem('authToken');
    const { state } = useAuth()
    state.isLogedIn=false;
    state.role='';
    return(
    
    <LogoutState/>)
}

const protectedRoute = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "*",
                element: <h1>404 - Not Found</h1>
            },
            {
                path: "",
                element: <RoleToDash/>
            },
            {
                path: "login",
                element: <Login />
            },
                        {
                path: "logout",
                element: <Logout />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "admin",
                element: <AdminDashboard />
            },
            {
                path: "dashboard",
                element: <RoleToDash />,

            },
            {
                path: "tickets",
                element: <TicketsList />
            },
            {
                path: `/tickets/:id`,
                element: <TicketDetails />
            },
            {
                path: "newticket",
                element: <AddTicket />
            },
            {
                path:"users",
                element:<UsersList/>
            },
            {
                path: `/users/:id`,
                element: <UserDetails />
            },
            {
                path:"/users/adduser",
                element:<AddUser/>
                
            }




        ]
    }
])

export default protectedRoute