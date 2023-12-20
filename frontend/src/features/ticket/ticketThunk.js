import { createAsyncThunk } from '@reduxjs/toolkit';
import { createTicket, getAllTickets, getTicket } from './ticketService';

export const createTicketThunk = createAsyncThunk(
  'ticket/create',
  async (ticketData, thunkAPI) => {
    try {
      const res = await createTicket(ticketData);

      if (res.status === 201) {
        return res.data;
      } else {
        const message = 'Something went wrong. Please try later.';
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllTicketsThunk = createAsyncThunk(
  'ticket/getAll',
  async (_, thunkAPI) => {
    try {
      const res = await getAllTickets();

      if (res.status === 200) {
        return res.data;
      } else {
        const message = 'Something went wrong. Please try later.';
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTicketThunk = createAsyncThunk(
  'ticket/getTicket',
  async (id, thunkAPI) => {
    try {
      const res = await getTicket(id);

      if (res.status === 200) {
        return res.data;
      } else {
        const message = 'Something went wrong. Please try later.';
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
