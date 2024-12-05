'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { TripPLan, Request } from './types';
import queryString from 'query-string';

export const CHATGPT_API_REDUCER_KEY = 'chatgptApi';

const chatgptApi = createApi({
  reducerPath: CHATGPT_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    credentials: 'include',
    paramsSerializer: (params) => queryString.stringify(params),
  }),
  endpoints: (builder) => ({
    getTripPlan: builder.mutation<TripPLan[], Request>({
      query: (body) => {
        return {
          url: 'chat-gpt',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});
export default chatgptApi;
