import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Comment } from '../../features/comments/commentsList';


export interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter((c) => c.id !== action.payload);
    },
    clearComments: (state) => {
      state.comments = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setComments, addComment, deleteComment, clearComments, setLoading } = commentsSlice.actions;
export default commentsSlice.reducer;
