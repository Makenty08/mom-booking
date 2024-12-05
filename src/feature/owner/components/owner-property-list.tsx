'use client';
import React from 'react';
import propertyApi from '~/api/property/api';
import { OwnerProperty } from '~/api/property/types';
import { OnwerPropertyCard } from './owner-property-card';
import { SkeletonOwnerPropertyCard } from '~/feature/property';
import EmptyPropertiesCard from '../../property/components/empty-properties-card';
import { Button } from '~/components/ui/button';
import { useRouter } from 'next/navigation';
export function OwnerPropertyList() {
  const { data: properties, isLoading } = propertyApi.endpoints.getOwnerProperties.useQuery('');
  console.log(properties);
  const router = useRouter();
  const firstLoadArray = new Array(10).fill(0);
  return (
    <div className=" w-full">
      <div className="flex items-center justify-center">
        <div className=" flex-1 text-3xl font-semibold ">Welcome, Ansar!</div>
        <Button onClick={() => router.push('/become-a-host/about-your-place')}>Add new</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
        {isLoading
          ? firstLoadArray.map((_, index) => <SkeletonOwnerPropertyCard key={index} />)
          : properties?.map((property: OwnerProperty) => (
              <OnwerPropertyCard key={property.id} property={property} />
            ))}
      </div>
      {!properties && !isLoading && (
        <h2 className="text-xl mt-2 whitespace-nowrap font-medium">
          <EmptyPropertiesCard />
        </h2>
      )}
    </div>
  );
}
