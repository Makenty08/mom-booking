import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import authApi, { AUTH_API_REDUCER_KEY } from '~/api/auth/api';
import bookingApi, { BOOKING_API_REDUCER_KEY } from '~/api/booking/api';
import chatgptApi, { CHATGPT_API_REDUCER_KEY } from '~/api/chatgpt/api';
import propertyApi, { PROPERTY_API_REDUCER_KEY } from '~/api/property/api';
import roomsApi, { ROOM_API_REDUCER_KEY } from '~/api/rooms/api';
import userApi, { USER_API_REDUCER_KEY } from '~/api/user/api';
import { authReducer, authSlice } from '~/feature/auth';
import { propertySlice } from '~/feature/property/property-slice';
import { propertyReducer } from '~/feature/property/property-slice';
import { searchSlice } from '~/feature/search/searchSlice';
const reducers = {
  [authSlice.name]: authReducer,
  [AUTH_API_REDUCER_KEY]: authApi.reducer,
  [PROPERTY_API_REDUCER_KEY]: propertyApi.reducer,
  [propertySlice.name]: propertyReducer,
  [ROOM_API_REDUCER_KEY]: roomsApi.reducer,
  searchSlice: searchSlice.reducer,
  [BOOKING_API_REDUCER_KEY]: bookingApi.reducer,
  [USER_API_REDUCER_KEY]: userApi.reducer,
  [CHATGPT_API_REDUCER_KEY]: chatgptApi.reducer,
};

const combinedReducers = combineReducers(reducers);
export const makeStore = () => {
  return configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(authApi.middleware)
        .concat(propertyApi.middleware)
        .concat(roomsApi.middleware)
        .concat(bookingApi.middleware)
        .concat(userApi.middleware)
        .concat(chatgptApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export const makePersistor = (store: AppStore) => persistStore(store);

export type Persistor = ReturnType<typeof makePersistor>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
