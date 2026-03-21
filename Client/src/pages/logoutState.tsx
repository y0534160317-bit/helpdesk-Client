
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

const logoutState=()=>{
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);
    return(<>
  <br/>
    <br/> 
    <br/>
    <h3>   You have been logged out</h3>
     <Link to="/login">To Enter</Link>
    <br/>
    <br/>
   
    </>)


    
}
export default logoutState

