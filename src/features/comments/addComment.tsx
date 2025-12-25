import { useState } from "react";
import { useAuth } from "../auth/loginLogic";
import { addCommentByIdCall } from "../../api/helpdeskApi";

const addComment = ({ id }: { id: number | null }) => {
  const { state } = useAuth();
  const [comment, setComment] = useState("");

  const handleAddComment = async () => {
    if (!state.token) return;
    if (id === null) return;
    try {
    await addCommentByIdCall(state.token, id, comment);
      
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default addComment;
      