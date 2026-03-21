import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import ticketsReducer from './slices/ticketsSlice';
import commentsReducer from './slices/commentsSlice';
import usersReducer from './slices/usersSlice';
import statusesReducer from './slices/statusesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketsReducer,
    comments: commentsReducer,
    users: usersReducer,
    statuses: statusesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;