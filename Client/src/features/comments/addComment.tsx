

// export default AddComment;
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // ✅ חדש
import { addComment } from "../../store/slices/commentsSlice"; // ✅ תיקון: ../../
import type { RootState } from "../../store/store"; // ✅ תיקון: ../../
import { addCommentByIdCall } from "../../api/helpdeskApi";
// MUI Imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';

const AddComment = ({ id }: { id: number | null }) => {
  const dispatch = useDispatch(); // ✅ חדש
  const { token } = useSelector((state: RootState) => state.auth); // ✅ חדש: קרא token מ-Redux
  const [comment, setComment] = useState("");

  const handleAddComment = async () => {
    if (!token) return; // ✅ שינוי: קרא token מ-Redux
    if (id === null) return;
    try {
      const response = await addCommentByIdCall(token, id, comment);
      // ✅ חדש: שמור תגובה ב-Redux מיד אחרי הוספה
      dispatch(addComment({
        id: response.id,
        content: comment,
        ticket_id: id,
        user_id: response.user_id,
        created_at: response.created_at,
      }));
      setComment(""); 
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      <TextField
        fullWidth
        label="הוסף תגובה..."
        multiline
        rows={3}
        variant="outlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="כתוב כאן את תגובתך..."
        sx={{ bgcolor: 'white' }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
            variant="contained" 
            endIcon={<SendIcon sx={{ transform: "scaleX(-1)" }} />}
            onClick={handleAddComment}
            disabled={!comment.trim()}
        >
            שלח תגובה
        </Button>
      </Box>
    </Box>
  );
};

export default AddComment;