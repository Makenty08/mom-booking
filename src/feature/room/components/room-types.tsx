'use client';
import React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';
import { RoomTypeCard } from './room-type-card';
import { useResponsive } from '~/hooks/use-responsive';
import { useParams } from 'next/navigation';
import roomsApi from '~/api/rooms/api';

export function RoomTypes() {
  const isDesktop = useResponsive('up', 'md');

  return <>{isDesktop ? <DesktopRoomTypes /> : <MobileRoomTypes />}</>;
}

const DesktopRoomTypes = () => {
  const params = useParams();
  const { data } = roomsApi.endpoints.getRoomTypesByPropertyId.useQuery({
    propertyId: params.id as string,
  });
  console.log(data, 23235);

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full flex flex-col gap-4"
    >
      <div className="flex justify-between">
        <div className="text-lg font-semibold hidden md:block">See the room types</div>
        <div className="space-x-2 hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>

      <CarouselContent className="">
        {data?.map((room, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
            <RoomTypeCard room={room} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const MobileRoomTypes = () => {
  const params = useParams();
  const { data } = roomsApi.endpoints.getRoomTypesByPropertyId.useQuery({
    propertyId: params.id as string,
  });
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <span className="text- font-semibold mb-2">Mobile Room Types here</span>
      <div className="flex flex-col gap-2">
        {data?.map((room, index) => (
          <RoomTypeCard key={index} room={room} />
        ))}
      </div>
    </div>
  );
};
