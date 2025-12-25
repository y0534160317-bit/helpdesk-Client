import { useEffect, useState } from "react";
import { getCommentsByIdCall } from "../../api/helpdeskApi";
import { useAuth } from "../auth/loginLogic";

export interface Comment {
      
    id: number|null,
    ticket_id: number|null,
    author_id: number|null,
    content: string,
    author_name: string,
    author_email: string,
    created_at: string
  
}


const commentsList =  ({ id }: { id: number | null }) => {
   
    
    const {state}=useAuth()
    if(state.token===null)return

    if(id===null)return;
    // {const list=await getCommentsByIdCall(state.token,id);}
    const [allComments,setAllComments] = useState<Comment[]>([]);
    useEffect(() => {
    const getComments = async () => {
        if (state.token === null) return;
        setAllComments(await getCommentsByIdCall(state.token,id));
    }
    getComments();
}, [state.token,id]); 
 if(state.token===null)return null;

    if(id===null)return null;
    return (
        <div>
            <h2>Comments List</h2>
            <ul>
                  {allComments.map((comment: Comment) => <li key={comment.id}>
                                         {comment.author_name}
                                        {comment.content}
                                       
                                        {comment.created_at}
                                        </li>)}
            </ul>
        </div>
    )
}

export default commentsList;