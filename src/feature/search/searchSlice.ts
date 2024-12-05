import { createSlice } from '@reduxjs/toolkit';

import { searchState } from './types';
import propertyApi from '~/api/property/api';

const initialState: searchState = {
  cityId: undefined,
  checkIn: undefined,
  checkOut: undefined,
  guestNumber: undefined,
  bookingUserRoomTypeId: undefined,
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    setCityId: (state, action) => {
      state.cityId = action.payload;
    },
    setCheckIn: (state, action) => {
      state.checkIn = action.payload;
    },
    setCheckOut: (state, action) => {
      state.checkOut = action.payload;
    },
    setGuestNumber: (state, action) => {
      state.guestNumber = action.payload;
    },
    setBookingUserRoomTypeId: (state, action) => {
      state.bookingUserRoomTypeId = action.payload;
    },
  },
});

export const { setCityId, setCheckIn, setCheckOut, setGuestNumber, setBookingUserRoomTypeId } =
  searchSlice.actions;
