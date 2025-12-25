

import { useLocation } from "react-router-dom";

const userDetails = () => {
    const location = useLocation();
    const { user } = location.state || {};

    return (
        <>
            <h2>User Details</h2>
            {user ? (
                <div>
                    <h3>{user.id}</h3>
                    <p>{user.name}</p>
                    <p>Status: {user.email}</p>
                    <p>Priority: {user.role}</p> 
                    
                </div>
            ) : (
                <p>No user details available.</p>
            )}
        </>
    );
}

export default userDetails;