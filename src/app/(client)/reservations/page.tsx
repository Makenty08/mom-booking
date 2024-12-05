'use client';
import React from 'react';
import bookingApi from '~/api/booking/api';
import { SkeletonOwnerPropertyCard } from '~/feature/property';
import UserReservationCard from '~/feature/reservations/user-reservations-card';
import { useAppSelector } from '~/store/hooks';
import userApi from '~/api/user/api';
import { Button } from '~/components/ui/button';

export default function ReservationsPage() {
  const { data, isLoading } = bookingApi.useGetBookingsUserQuery('');
  console.log(data, 232);

  const { data: userData } = userApi.endpoints.getUserProfile.useQuery(null);
  console.log(data, 232);
  return (
    <div className="space-y-4">
      {userData && (
        <div className="flex justify-between p-4">
          <div className="flex flex-col gap-4 ">
            <div className="flex gap-4">
              <div className="text-xl text-slate-600">{userData.firstName}</div>
              <div className="text-xl text-slate-600">{userData.lastName}</div>
            </div>
            <div>
              <div>{userData.phoneNumber}</div>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-semibold mb-4 mt-4 md:mt-0">Your Reservations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
        {isLoading
          ? Array(4)
              .fill(2)
              .map((_, index) => <SkeletonOwnerPropertyCard key={index} />)
          : data?.map((booking: any) => <UserReservationCard key={booking.id} booking={booking} />)}
      </div>
    </div>
  );
}
