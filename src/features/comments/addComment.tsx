import { useState } from "react";
import { useAuth } from "../auth/loginLogic";
import { addCommentByIdCall } from "../../api/helpdeskApi";
// MUI Imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';

const AddComment = ({ id }: { id: number | null }) => {
  const { state } = useAuth();
  const [comment, setComment] = useState("");

  const handleAddComment = async () => {
    if (!state.token) return;
    if (id === null) return;
    try {
      await addCommentByIdCall(state.token, id, comment);
      setComment(""); // ניקוי השדה לאחר שליחה
      // הערה: רצוי להוסיף כאן מנגנון רענון לרשימת התגובות
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
            endIcon={<SendIcon sx={{ transform: "scaleX(-1)" }} />} // היפוך האייקון לעברית
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