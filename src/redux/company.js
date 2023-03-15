/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
  name: 'Company',
  initialState: {
    company: {},
  },
  reducers: {
    companyDetails: (state, action) => {
      state.company = action.payload;
    },
  },
});

export const { companyDetails } = companySlice.actions;
export default companySlice;
