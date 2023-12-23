import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTicketNotes } from './noteService';

const initialState = {
  notes: [],
  loading: false,
  hasError: false,
  success: false,
  message: '',
};

export const getNotes = createAsyncThunk(
  'note/getAll',
  async (ticketId, thunkAPI) => {
    try {
      const res = await getTicketNotes(ticketId);
      if (res.status === 200) {
        return res.data;
      } else {
        const message = 'Something went wrong. Please try later.';
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        error?.message ||
        error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.hasError = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.data;
        state.success = true;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
        state.hasError = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = noteSlice.actions;

export default noteSlice.reducer;
