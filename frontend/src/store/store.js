import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import referenceDataReducer from '../features/auth/referenceDataSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    referenceData: referenceDataReducer,
  },
});

export default store;
