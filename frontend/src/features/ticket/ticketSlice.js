import { createSlice } from '@reduxjs/toolkit';
import {
  closeTicketThunk,
  createTicketThunk,
  getAllTicketsThunk,
  getTicketThunk,
} from './ticketThunk';

const initialState = {
  tickets: [],
  ticket: {},
  success: {
    getTicketsSuccess: false,
    closeTicketSuccess: false,
    createTicketSuccess: false,
    getTicketSuccess: false,
  },
  hasError: false,
  loading: false,
  message: '',
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = initialState.success;
      state.hasError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicketThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTicketThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success.createTicketSuccess = true;
        state.ticket = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(createTicketThunk.rejected, (state, action) => {
        state.loading = false;
        state.hasError = true;
        state.message = action.payload.message;
      })

      .addCase(getAllTicketsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTicketsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success.getTicketsSuccess = true;
        state.tickets = action.payload.data;
      })
      .addCase(getAllTicketsThunk.rejected, (state, action) => {
        state.loading = false;
        state.hasError = true;
        state.message = action.payload.message;
      })

      .addCase(getTicketThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTicketThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success.getTicketSuccess = true;
        state.ticket = action.payload.data;
      })
      .addCase(getTicketThunk.rejected, (state, action) => {
        state.loading = false;
        state.hasError = true;
        state.message = action.payload.message;
      })

      .addCase(closeTicketThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success.closeTicketSuccess = true;
        state.ticket = action.payload.data;
        state.message = 'Ticket is closed';
      })
      .addCase(closeTicketThunk.rejected, (state, action) => {
        state.loading = false;
        state.hasError = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
