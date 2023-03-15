import { configureStore } from '@reduxjs/toolkit';
import userSlice from './seeker';
import adminSlice from './admin';
import recruiterSlice from './recruiter';
import companySlice from './company';

const store = configureStore({
  reducer: {
    userInfo: userSlice.reducer,
    adminInfo: adminSlice.reducer,
    recruiterInfo: recruiterSlice.reducer,
    companyInfo: companySlice.reducer,
  },
});

export default store;
