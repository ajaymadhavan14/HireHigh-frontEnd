/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'Admin',
  initialState: {
    admin: {},
  },
  reducers: {
    adminDetails: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const { adminDetails } = adminSlice.actions;
export default adminSlice;
