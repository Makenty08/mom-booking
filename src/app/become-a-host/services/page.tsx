'use client';
import React from 'react';
import { PropertyServicesForm2 } from '~/feature/become-a-host/components/property-services-form2';
import propertyApi from '~/api/property/api';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppSelector } from '~/store/hooks';

export default function Services() {
  const { data: services } = propertyApi.endpoints.getPropertyServices.useQuery(null);
  const [editProperty] = propertyApi.endpoints.editOwnerProperty.useMutation();
  const propertyId = useAppSelector((state) => state.propertySlice.propertyId);
  const { data: ownerProperty } = propertyApi.endpoints.getOwnerProperty.useQuery(
    propertyId ? { id: propertyId.toString() } : skipToken,
    { skip: !propertyId },
  );
  console.log(ownerProperty);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className=" text-center">
        <div className="text-3xl font-semibold">Tell guests what your place has to offer</div>
        <div className="text-xl text-slate-400">
          You can add more amenities after you publish your listing.
        </div>
      </div>
      <div className="flex-1 items-center justify-center">
        {services && ownerProperty ? (
          <PropertyServicesForm2
            services={services}
            selectedServices={ownerProperty.propertyServices || []}
          />
        ) : (
          <div>Loading...</div> // Show loading or handle the absence of data
        )}
      </div>
    </div>
  );
}
