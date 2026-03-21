import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Ticket } from '../../features/tickets/ticketsList';

// ✅ EXPORT: הוסף את Ticket כדי שקובצים אחרים יכולו לייבא אתו
export type { Ticket };

export interface TicketsState {
  allTickets: Ticket[];
  isLoading: boolean;
}

const initialState: TicketsState = {
  allTickets: [],
  isLoading: false,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.allTickets = action.payload;
    },
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.allTickets.push(action.payload);
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.allTickets.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.allTickets[index] = action.payload;
      }
    },
    deleteTicket: (state, action: PayloadAction<number>) => {
      state.allTickets = state.allTickets.filter((t) => t.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTickets, addTicket, updateTicket, deleteTicket, setLoading } = ticketsSlice.actions;
export default ticketsSlice.reducer;
