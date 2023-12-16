import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import referenceDataReducer from '../features/referenceData/referenceDataSlice';
import ticketReducer from '../features/ticket/ticketSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    referenceData: referenceDataReducer,
    ticket: ticketReducer,
  },
});

export default store;
