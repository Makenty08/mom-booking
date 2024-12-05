'use client';
import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { LoginResponse, LoginRequest } from './types';

export const AUTH_API_REDUCER_KEY = 'authApi';

const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => {
        return {
          url: '/auth/registration',
          method: 'POST',
          body: credentials,
        };
      },
    }),
    ownerRegister: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => {
        return {
          url: '/owner/registration',
          method: 'POST',
          body: credentials,
        };
      },
    }),
  }),
});
export default authApi;
