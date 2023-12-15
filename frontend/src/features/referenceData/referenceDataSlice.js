import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRefService } from './referenceDataService';

const initialState = {
  referenceData: {},
  success: false,
  hasError: false,
  loading: false,
};

export const getRef = createAsyncThunk(
  'referenceData/getRef',
  async (type, thunkAPI) => {
    const res = await getRefService(type);
    try {
      if (res.status === 200) {
        return { type, data: res.data };
      } else {
        const message = 'Something went wrong. Please try later.';
        return thunkAPI.rejectWithValue(message);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const referenceDataSlice = createSlice({
  name: 'referenceData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRef.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRef.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const { type, data } = action.payload;
        state.referenceData[type] = data.data;
      })
      .addCase(getRef.rejected, (state, action) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export default referenceDataSlice.reducer;
