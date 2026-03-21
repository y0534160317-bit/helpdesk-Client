import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Status {
  id: number;
  name: string;
}

export interface StatusesState {
  allStatuses: Status[];
  isLoading: boolean;
}

const initialState: StatusesState = {
  allStatuses: [],
  isLoading: false,
};

const statusesSlice = createSlice({
  name: 'statuses',
  initialState,
  reducers: {
    setStatuses: (state, action: PayloadAction<Status[]>) => {
      state.allStatuses = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setStatuses, setLoading } = statusesSlice.actions;
export default statusesSlice.reducer;
