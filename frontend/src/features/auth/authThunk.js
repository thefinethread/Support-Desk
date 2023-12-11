import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './authService';

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
        error?.response?.data?.message || error?.message || error?.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const res = await loginUser(userData);

      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data.data));
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
