import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from '~/store/persist-storage';
import authApi from '~/api/auth/api';
import propertyApi from '~/api/property/api';

import type { PropertyState } from './types';

const initialState: PropertyState = {
  propertyId: '',
};

export const propertySlice = createSlice({
  name: 'propertySlice',
  initialState,
  reducers: (create) => ({
    removeProperty: (state) => {
      state.propertyId = '';
    },
    addProperty: create.preparedReducer(
      (propertyId: string) => {
        return { payload: { propertyId } };
      },
      (state, action) => {
        state.propertyId = action.payload.propertyId;
      },
    ),
  }),
  extraReducers: (builder) => {
    builder.addMatcher(
      propertyApi.endpoints.createProperty.matchFulfilled,
      (state, { payload }) => {
        state.propertyId = payload.propertyId.toString();
      },
    );
  },
});

export const propertyReducer = persistReducer(
  {
    key: 'rtk:property',
    storage,
    whitelist: ['propertyId'],
  },
  propertySlice.reducer,
);

export const { removeProperty, addProperty } = propertySlice.actions;
