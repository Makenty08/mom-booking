'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { User } from './types';
import queryString from 'query-string';

export const USER_API_REDUCER_KEY = 'userApi';

const userApi = createApi({
  reducerPath: USER_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    credentials: 'include',
    paramsSerializer: (params) => queryString.stringify(params),
  }),
  tagTypes: ['Bookings'],
  endpoints: (builder) => ({
    getUserProfile: builder.query<User, any>({
      query: () => {
        return {
          url: 'user/profile',
          method: 'GET',
        };
      },
      providesTags: ['Bookings'],
    }),
  }),
});
export default userApi;
