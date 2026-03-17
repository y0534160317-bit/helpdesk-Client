import { useEffect, useState } from "react";
import {  getStatusesCall } from "../../api/helpdeskApi";
import { useAuth } from "../auth/loginLogic";


export interface Status {
    id: number,
    name: string
}

const statusesList =  () => {
    const {state}=useAuth()
    if(state.token===null)return
  
    const [allStatuses,setAllStatuses] = useState<Status[]>([]);
    useEffect(() => {
    const getStatuses = async () => {
        if (state.token === null) return;
        setAllStatuses(await getStatusesCall(state.token));
    }
    getStatuses();
}, [state.token]); 
 if(state.token===null)return null;

    return (

        <>
       {allStatuses} 
        </>
    )
}

export default statusesList;