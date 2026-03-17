import { useEffect, useState } from "react";
import { getCommentsByIdCall } from "../../api/helpdeskApi";
import { useAuth } from "../auth/loginLogic";
// MUI Imports
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

export interface Comment {
    id: number | null,
    ticket_id: number | null,
    author_id: number | null,
    content: string,
    author_name: string,
    author_email: string,
    created_at: string
}

const CommentsList = ({ id }: { id: number | null }) => {
    const { state } = useAuth();
    const [allComments, setAllComments] = useState<Comment[]>([]);

    useEffect(() => {
        const getComments = async () => {
            if (state.token === null || id === null) return;
            setAllComments(await getCommentsByIdCall(state.token, id));
        }
        getComments();
    }, [state.token, id]);

    if (state.token === null || id === null) return null;

    // פונקציית עזר ליצירת צבע רקע לאווטאר לפי שם
    const stringToColor = (string: string) => {
        let hash = 0;
        for (let i = 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(-2);
        }
        return color;
    }

    return (
        <Paper elevation={0} sx={{ bgcolor: 'transparent' }}>
            {allComments.length > 0 ? (
                <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2 }}>
                    {allComments.map((comment: Comment, index) => (
                        <div key={comment.id || index}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar 
                                        alt={comment.author_name} 
                                        sx={{ bgcolor: stringToColor(comment.author_name || 'U') }}
                                    >
                                        {comment.author_name ? comment.author_name[0].toUpperCase() : '?'}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: 'bold' }}>{comment.author_name}</span>
                                            <Typography variant="caption" color="textSecondary">
                                                {new Date(comment.created_at).toLocaleString('he-IL')}
                                            </Typography>
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            sx={{ display: 'inline', mt: 1 }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {comment.content}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            {index < allComments.length - 1 && <Divider variant="inset" component="li" />}
                        </div>
                    ))}
                </List>
            ) : (
                <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 2 }}>
                    אין תגובות עדיין. היה הראשון להגיב!
                </Typography>
            )}
        </Paper>
    );
}

export default CommentsList;