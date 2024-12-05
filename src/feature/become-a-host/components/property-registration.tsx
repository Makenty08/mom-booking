'use client';

import React from 'react';
import { PropertyRegistrationForm } from './property-registration-form';
import propertyApi from '~/api/property/api';
import { useAppSelector } from '~/store/hooks';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { OwnerProperty, Cities } from '~/api/property/types';

export function PropertyRegistration() {
  const propertyId = useAppSelector((state) => state.propertySlice.propertyId);
  console.log(propertyId);
  const {
    data: property,
    isFetching: propertyFetching,
    isError,
    error,
  } = propertyApi.endpoints.getOwnerProperty.useQuery(
    propertyId ? { id: propertyId.toString() } : skipToken,
    { skip: !propertyId },
  );

  const typedError = error as Error | undefined;

  if (propertyFetching) {
    return <p>Loading data...</p>;
  }

  if (isError) {
    return <p>Error loading data: {typedError?.message}</p>;
  }

  return (
    <div>
      <PropertyRegistrationForm property={property as OwnerProperty | undefined} />
    </div>
  );
}
