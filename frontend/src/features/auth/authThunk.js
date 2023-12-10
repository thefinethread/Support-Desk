import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from './authService';

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const res = await registerUser(userData);
      if (res.status === 201) {
        localStorage.setItem('user', JSON.stringify(res.data.data));
        return res.data;
      } else {
        const message = 'Something went wrong. Please try later.';
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
