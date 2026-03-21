

// export default CommentsList;
import { useEffect } from "react"; // ✅ הסר useState
import { useDispatch, useSelector } from "react-redux"; // ✅ חדש
import { setComments } from "../../store/slices/commentsSlice"; // ✅ חדש
import type { RootState } from "../../store/store"; // ✅ חדש
import { getCommentsByIdCall } from "../../api/helpdeskApi";
// MUI Imports
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export interface Comment {
  id: number;
  content: string;
  ticket_id: number;
  user_id: number;
  user_name?: string;
  created_at?: string;
}

const CommentsList = ({ id }: { id: number | null }) => {
  const dispatch = useDispatch(); // ✅ חדש
  const { token } = useSelector((state: RootState) => state.auth); // ✅ חדש: קרא token מ-Redux
  const { comments } = useSelector((state: RootState) => state.comments); // ✅ חדש: קרא תגובות מ-Redux

  useEffect(() => {
    const getComments = async () => {
      if (id === null || !token) return;
      const fetchedComments = await getCommentsByIdCall(token, id);
      dispatch(setComments(fetchedComments)); // ✅ חדש: שמור ב-Redux
    }
    getComments();
  }, [id, token, dispatch]); // ✅ שינוי: הוסף dispatch כ-dependency

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        תגובות
      </Typography>
      {comments.length > 0 ? (
        comments.map((comment: Comment) => (
          <Paper key={comment.id} sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {comment.user_name || 'משתמש אנונימי'}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {comment.content}
            </Typography>
            <Typography variant="caption" sx={{ color: 'gray', mt: 1 }}>
              {new Date(comment.created_at || '').toLocaleDateString('he-IL')}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography variant="body2" sx={{ color: 'gray' }}>
          אין תגובות עדיין
        </Typography>
      )}
    </Box>
  );
};

export default CommentsList;