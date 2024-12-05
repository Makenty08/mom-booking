'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import { Booking } from './types';
import queryString from 'query-string';

export const BOOKING_API_REDUCER_KEY = 'bookingApi';

const bookingApi = createApi({
  reducerPath: BOOKING_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    credentials: 'include',
    paramsSerializer: (params) => queryString.stringify(params),
  }),
  tagTypes: ['Bookings'],
  endpoints: (builder) => ({
    getBookings: builder.query<Booking[], any>({
      query: () => {
        return {
          url: 'owner/bookings',
          method: 'GET',
        };
      },
      providesTags: ['Bookings'],
    }),
    changeStatus: builder.mutation<any, { data: { status: string }; bookingId: string }>({
      query: ({ data, bookingId }) => {
        return {
          url: `/owner/bookings/${bookingId}/status`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Bookings'],
    }),
    createBooking: builder.mutation<any, any>({
      query: (body) => ({
        url: 'booking/create-booking',
        method: 'POST',
        body,
      }),
    }),
    getBookingsUser: builder.query<any, any>({
      query: () => {
        return {
          url: 'booking/user/bookings',
          method: 'GET',
        };
      },
    }),
  }),
});
export default bookingApi;
