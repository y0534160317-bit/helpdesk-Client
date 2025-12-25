import { useEffect, useState } from "react";
import {  getUsersByIdCall, getUsersCall } from "../../api/helpdeskApi";
import { useAuth } from "../../features/auth/loginLogic";
import { Link, useNavigate } from "react-router-dom";



export interface User {
  id: number,
  name: string,
  email: string,
  role: string,
  
  
}

const usersList= () => {
    const { state } = useAuth()

    const [allUsers, setAllUsers] = useState<User[]>([])

useEffect(() => {
    const getUsers = async () => {
        if (state.token === null) return;
        setAllUsers(await getUsersCall(state.token));
    }
    getUsers();
}, [state.token]);


const navigate = useNavigate();

    return (
        <>
          <Link to={""}>
                        <button onClick={  async()=>{ 
                                if(state.token===null)return
                                navigate(`/users/adduser`);
                              }}>הוספת משתמש</button></Link>
            <h5>==============</h5>
            <div>
                {allUsers.length!=0?(
            <ul>
                {

                    allUsers.map((user: User) => <li key={user.id}>
                        {user.name}
                        {user.email}
                        {user.role}
                         <Link to={""}>
                        <button onClick={  async()=>{ 
                                if(state.token===null)return
                                if(user===null)return
                                const usr = await getUsersByIdCall(state.token,user.id);
                                
                                navigate(`/users/${user.id}`, { state: { user: usr } });
                              }}>user details</button></Link>
                    </li>)

                }
            </ul>):
            <h3>"אין משתמשים במערכת</h3>}
            </div>
        </>
    )

}
export default usersList



