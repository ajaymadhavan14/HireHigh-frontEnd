/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const recruiterSlice = createSlice({
  name: 'Recruiter',
  initialState: {
    recruiter: {},
  },
  reducers: {
    recruiterDetails: (state, action) => {
      state.recruiter = action.payload;
    },
  },
});

export const { recruiterDetails } = recruiterSlice.actions;
export default recruiterSlice;
