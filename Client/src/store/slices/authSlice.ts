import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from './usersSlice';

export interface AuthState {
  token: string | null;
  role: string | null;
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('authToken') || null,
  role: localStorage.getItem('userRole') || null,
  user: null,
  isLoading: false,
  isLoggedIn: !!localStorage.getItem('authToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; role: string | null; user?: User }>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.user = action.payload.user || null;
      state.isLoggedIn = true;
      localStorage.setItem('authToken', action.payload.token);
      if (action.payload.role) {
        localStorage.setItem('userRole', action.payload.role);
      }
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;