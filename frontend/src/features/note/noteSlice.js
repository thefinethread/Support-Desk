import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createNote, getTicketNotes } from './noteService';

const initialState = {
  notes: [],
  loading: false,
  hasError: false,
  success: { getNotes: false, addNote: false },
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

export const createNoteThunk = createAsyncThunk(
  'note/create',
  async ({ ticketId, noteData }, thunkAPI) => {
    try {
      const res = await createNote(ticketId, noteData);
      if (res.status === 201) {
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
      state.success = initialState.success;
      state.message = '';
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
        state.success.getNotes = true;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
        state.hasError = true;
        state.message = action.payload.message;
      })

      .addCase(createNoteThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload.data);
        state.success.addNote = true;
        state.message = 'your note has been added';
      })
      .addCase(createNoteThunk.rejected, (state, action) => {
        state.loading = false;
        state.hasError = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = noteSlice.actions;

export default noteSlice.reducer;
