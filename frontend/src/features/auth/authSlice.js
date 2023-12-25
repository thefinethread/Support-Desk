import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "./authThunk";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  hasError: false,
  success: false,
  error: null,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.message = "";
      state.success = false;
      state.error = null;
      state.hasError = false;
    },
  },
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
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.hasError = true;
        state.message = action.payload;
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.hasError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
