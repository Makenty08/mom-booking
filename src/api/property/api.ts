'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import queryString from 'query-string';
import {
  Cities,
  EditPropertyRequest,
  GetCitiesResponse,
  GetPropertyResponse,
  GetServicesResponse,
  OwnerProperties,
  OwnerProperty,
  Property,
  PropertyRequest,
  ProperyResponse,
} from './types';

export const PROPERTY_API_REDUCER_KEY = 'propertyApi';

const propertyApi = createApi({
  reducerPath: PROPERTY_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    credentials: 'include',
    paramsSerializer: (params) => queryString.stringify(params),
  }),
  tagTypes: ['Property'],
  endpoints: (builder) => ({
    getCities: builder.query<GetCitiesResponse, {}>({
      query: () => {
        return {
          url: 'cities',
          method: 'GET',
        };
      },
    }),
    getProperty: builder.query<GetPropertyResponse, number>({
      query: (id) => {
        return {
          url: `property/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['Property'],
    }),
    getProperties: builder.query<
      Property[],
      { cityId?: number; checkIn?: string | number | Date; checkOut?: string; capacity?: number }
    >({
      query: ({ cityId, capacity, checkIn, checkOut }) => {
        return {
          url: `property`,
          method: 'GET',
          params: { cityId, capacity, checkIn, checkOut },
        };
      },
      providesTags: ['Property'],
    }),
    getOwnerProperties: builder.query<OwnerProperties, {}>({
      query: () => {
        return {
          url: `owner/properties`,
          method: 'GET',
        };
      },
      providesTags: ['Property'],
    }),
    getOwnerProperty: builder.query<OwnerProperty, { id: string }>({
      query: ({ id }) => {
        return {
          url: `owner/properties/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['Property'],
    }),
    createProperty: builder.mutation<ProperyResponse, PropertyRequest>({
      query: (data) => {
        return {
          url: `property`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Property'],
    }),
    editOwnerProperty: builder.mutation<OwnerProperty, { id: string; data: EditPropertyRequest }>({
      query: ({ id, data }) => {
        return {
          url: `owner/properties/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Property'],
    }),
    deleteOwnerProperty: builder.mutation<any, { id: string }>({
      query: ({ id }) => {
        return {
          url: `owner/properties/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Property'],
    }),
    getPropertyServices: builder.query<GetServicesResponse, null>({
      query: () => {
        return {
          url: `service`,
          method: 'GET',
        };
      },
    }),
    uploadPhoto: builder.mutation<null, { propertyId: string; file: File }>({
      query: (credentials) => {
        const formData = new FormData();
        formData.append('file', credentials.file);

        return {
          url: `/photo/${credentials.propertyId}`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Property'],
    }),
  }),
});
export default propertyApi;
