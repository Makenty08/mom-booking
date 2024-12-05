'use client';
import React from 'react';
import propertyApi from '~/api/property/api';
import { OwnerProperty } from '~/api/property/types';
import { OnwerPropertyCard } from '~/feature/owner';
import { SkeletonOwnerPropertyCard } from '../../property/components/skeleton-property-card';

export function ReservationsSummary() {
  const { data: properties, isLoading } = propertyApi.endpoints.getOwnerProperties.useQuery('');
  console.log(properties);
  const firstLoadArray = new Array(10).fill(0);
  return (
    <div className="">
      <div className="md:flex space-y-4">
        <div className=" flex-1 text-3xl font-semibold ">Welcome, Ansar!</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
        {isLoading
          ? firstLoadArray.map((_, index) => <SkeletonOwnerPropertyCard key={index} />)
          : properties?.map((property: OwnerProperty) => (
              <OnwerPropertyCard key={property.id} property={property} />
            ))}
        {!properties && !isLoading && (
          <h2 className="text-xl mt-2 whitespace-nowrap font-medium">No properties found</h2>
        )}
      </div>
    </div>
  );
}
