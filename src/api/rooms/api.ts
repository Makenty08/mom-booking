'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import queryString from 'query-string';
import { EditRoomTypeRequest, getRoomTypesRequest, getRoomTypesResponse } from './types';
import { GetFacilitiesResponse } from '../property/types';

export const ROOM_API_REDUCER_KEY = 'roomsApi';

const roomsApi = createApi({
  reducerPath: ROOM_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    credentials: 'include',
    paramsSerializer: (params) => queryString.stringify(params),
  }),
  tagTypes: ['Rooms', 'RoomTypes'],
  endpoints: (builder) => ({
    getRoomTypesByPropertyId: builder.query<getRoomTypesResponse, getRoomTypesRequest>({
      query: ({ propertyId }) => `owner/${propertyId}/room-types`,
      providesTags: ['Rooms'],
    }),
    createRoomType: builder.mutation<any, any>({
      query: (body) => ({
        url: 'room/create-room-type',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Rooms'],
    }),
    editRoomType: builder.mutation<
      getRoomTypesResponse,
      { propertyId: number; roomTypeId: string; body: EditRoomTypeRequest }
    >({
      query: ({ propertyId, roomTypeId, body }) => ({
        url: `owner/${propertyId}/room-types/${roomTypeId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Rooms'],
    }),
    deleteRoomType: builder.mutation<
      any,
      {
        propertyId: string;
        roomTypeId: number;
      }
    >({
      query: ({ propertyId, roomTypeId }) => ({
        url: `owner/${propertyId}/room-types/${roomTypeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rooms'],
    }),
    uploadPhoto: builder.mutation<null, { roomTypeId: string; file: File }>({
      query: (credentials) => {
        const formData = new FormData();
        formData.append('file', credentials.file);

        return {
          url: `/photo/room-type/${credentials.roomTypeId}`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Rooms'],
    }),
    getRoomFacilities: builder.query<GetFacilitiesResponse, any>({
      query: () => `facility`,
    }),
    getOwnerRoom: builder.query<any, { propertyId: string; roomTypeId: string }>({
      query: ({ propertyId, roomTypeId }) => {
        return {
          url: `owner/${propertyId}/rooms/${roomTypeId}`,
          method: 'GET',
        };
      },
    }),
  }),
});
export default roomsApi;
