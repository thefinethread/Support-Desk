import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import referenceDataReducer from '../features/referenceData/referenceDataSlice';
import ticketReducer from '../features/ticket/ticketSlice';
import noteReducer from '../features/note/noteSlice';
import themeReducer from '../features/theme/themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    referenceData: referenceDataReducer,
    ticket: ticketReducer,
    note: noteReducer,
    theme: themeReducer,
  },
});

export default store;
