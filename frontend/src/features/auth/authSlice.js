import { createSlice } from '@reduxjs/toolkit';
import { register } from './authThunk';

const initialState = {
  user: null,
  loading: false,
  hasError: false,
  success: false,
  error: null,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.hasError = true;
        state.message = action.payload;
      });
  },
});

export default authSlice.reducer;
