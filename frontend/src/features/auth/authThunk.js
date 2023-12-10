import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser } from './authService';

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const res = await registerUser(userData);
      console.log(res);
      if (res.statusText === 'OK') {
        return res.data();
      } else {
        const message = 'Something went wrong. Please try later.';
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      console.log(error);
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
