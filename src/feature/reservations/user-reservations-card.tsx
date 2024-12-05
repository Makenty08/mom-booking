'use client';

import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import bookingApi from '~/api/booking/api';
import { formatDate } from '~/libs/date';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import chatgptApi from '~/api/chatgpt/api';
import { useEffect, useState } from 'react';
import { Skeleton } from '~/components/ui/skeleton';
export default function UserReservationCard({ booking }: { booking: any }) {
  return (
    <div className="w-full aspect-[4/3] hover:cursor-pointer">
      <div className="relative aspect-square">
        <Image
          className="object-cover h-full rounded-xl"
          src={
            booking
              ? `${process.env.NEXT_PUBLIC_API_URL}photo/${booking.room.property.propertyPhotos[0]?.photo.id}`
              : '/static/maldives2.webp'
          }
          alt="Property Image"
          width={500}
          height={500}
        />
      </div>

      <div className="flex justify-between">
        <div className="text-lg font-medium">
          <span>{booking.room.property.name}</span>
        </div>
        <div className="flex items-center">
          <Star size={16} fill="black" />
          {booking.room.property.rating === 0 ? '4.2' : booking.room.property.rating}
        </div>
      </div>
      <div className="text-neutral-500 line-clamp-2">Guest number: {2}</div>
      <div className="text-neutral-500 line-clamp-2">
        Dates {formatDate(new Date(booking.checkIn))} - {formatDate(new Date(booking.checkOut))}
      </div>
      <div className=" flex justify-between items-center">
        <div>
          <span className="font-semibold">Total price: ${booking.totalPrice}</span>
        </div>
        <div>
          {booking.checkIn && booking.checkOut && booking.room.property.city.name && (
            <PlanTrip
              checkIn={booking.checkIn}
              checkOut={booking.checkOut}
              cityName={booking.room.property.city.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface Props {
  cityName: string;
  checkIn: string;
  checkOut: string;
}

const PlanTrip = ({ cityName, checkIn, checkOut }: Props) => {
  console.log('wws', cityName);
  const [getTripPlan, { isLoading }] = chatgptApi.endpoints.getTripPlan.useMutation();
  const [trips, setTrips] = useState<any>([]);

  const handleFetchData = async () => {
    const res = await getTripPlan({
      checkIn: checkIn,
      cityName: cityName,
      checkOut: checkOut,
    }).unwrap();
    const array = [];
    for (const [key, value] of Object.entries(res)) {
      array.push(value);
    }
    setTrips(array);

    console.log(res);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={handleFetchData}>Plan Your trip</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Plan your trip with AI</DialogTitle>
          <DialogDescription>
            {` We will find suitable solutions for you trip planning`}
          </DialogDescription>
        </DialogHeader>
        {isLoading && <Skeleton className="h-100 w-full" />}
        <div className="overflow-scroll">
          {trips.map((item: any, index: any) => {
            return (
              <>
                <div className=" space-y-4 divide-y">
                  <div className="text-2xl">Day: {index + 1}</div>
                  <div className="flex flex-col gap-1">
                    <div>{item.morning}</div>
                    <div>{item.afternoon}</div>
                    <div>{item.evening}</div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
