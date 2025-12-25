import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/loginLogic";




 const Header = () => {
 const {state} = useAuth();
  return (
<>
   
    <header>
      <Link to="/dashboard">dashboard</Link> |{" "}
      {!state.isLogedIn&&<Link to="/login">Login</Link>}
      {state.isLogedIn&&<Link to="/logout">Logout</Link>} |{" "}
      <Link to="/register">Register</Link>|{" "}
    {
        state.role==='admin'&& <Link to="/admin">Admin</Link>
    }
    </header>
    </>
  );
};

export default Header;
