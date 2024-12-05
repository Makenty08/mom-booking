'use client';
import React from 'react';
import { PropertyDescription } from './property-description';
import { ReservationCheckout } from '~/feature/reservation';
import { PropertyReviews } from '~/feature/review';
import { RoomTypes } from '~/feature/room';
import { MobileSubHeader } from '~/components/mobile-subheader';
import { PropertyGallery } from '~/feature/photo-gallery';
import propertyApi from '~/api/property/api';
import { skipToken } from '@reduxjs/toolkit/query';
import { useParams } from 'next/navigation';

interface PropertyProps {
  propertyId: string;
}

export function Property({ propertyId }: PropertyProps) {
  const { data: property, isLoading } = propertyApi.endpoints.getProperty.useQuery(
    propertyId ? +propertyId : skipToken,
    { skip: !propertyId },
  );
  console.log(property);

  return (
    <div className=" ">
      <div className="md:hidden md:h-0">
        <MobileSubHeader />
      </div>
      <PropertyGallery propertyPhotos={property?.propertyPhotos || []} isLoadig={isLoading} />
      <PropertyBodyStyle />
    </div>
  );
}

const PropertyBodyStyle = () => {
  const params = useParams();
  const { data: property } = propertyApi.endpoints.getProperty.useQuery(
    params.id ? +params.id : skipToken,
    { skip: !params.id },
  );

  return (
    <div className="p-5 flex flex-col gap-4 md:gap-8 relative">
      <div className="font-semibold text-xl md:text-3xl">{property?.name}</div>

      <div className="flex gap-8 flex-wrap xl:flex-nowrap">
        <div className="lg:flex-[3_3_0%]">
          <div className=" flex flex-col gap-8">
            <RoomTypes />
            <PropertyDescription />
          </div>
        </div>

        <div className="lg:flex-[2_2_0%] w-full mx-auto sticky top-16 self-start">
          <ReservationCheckout />
        </div>
      </div>

      <div>
        <PropertyReviews />
      </div>
    </div>
  );
};
