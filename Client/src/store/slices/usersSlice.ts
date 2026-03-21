import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// ✅ Define and export User interface locally
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UsersState {
  allUsers: User[];
  isLoading: boolean;
}

const initialState: UsersState = {
  allUsers: [],
  isLoading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.allUsers = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.allUsers.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.allUsers = state.allUsers.filter((u) => u.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUsers, addUser, deleteUser, setLoading } = usersSlice.actions;
export default usersSlice.reducer;
