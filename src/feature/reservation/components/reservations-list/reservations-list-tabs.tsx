/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { TAB_LIST_CATEGORY } from '../constants';
import { EmptyCard } from './empty-card';
import { ListTabCard } from './list-tab-card';
import { Booking } from '~/api/booking/types';
import { Skeleton } from '~/components/ui/skeleton';

interface Props {
  bookings: Booking[];
}

export function ReservationsListTabs({ bookings }: Props) {
  const [statusSlug, setStatusSlug] = useState('PENDING');
  console.log('wws', statusSlug);
  const renderBookingsByStatus = (statusSlug: string) => {
    if (statusSlug === 'ALL') {
      return bookings.map((booking, index) => (
        <ListTabCard key={index} booking={booking} /> // Assume ListTabCard can accept a booking prop
      ));
    }
    const filteredBookings = bookings.filter((booking) => {
      if (statusSlug === booking.status) return true;
    });

    if (filteredBookings.length === 0) {
      return <EmptyCard />; // Show an empty card if there are no bookings for this tab
    }

    return filteredBookings.map((booking, index) => (
      <ListTabCard key={index} booking={booking} /> // Assume ListTabCard can accept a booking prop
    ));
  };
  return (
    <Tabs defaultValue="PENDING" className="w-full">
      <TabsList className="flex justify-between overflow-scroll gap-2 no-scrollbar">
        {TAB_LIST_CATEGORY.map((tab, index) => (
          <TabsTrigger
            value={tab.slug}
            key={index}
            className="w-full text-md"
            onClick={(e) => {
              const target = e.target as HTMLButtonElement;
              setStatusSlug(target.textContent || 'PENDING');
            }}
          >
            {tab.slug}
          </TabsTrigger>
        ))}
      </TabsList>
      {TAB_LIST_CATEGORY.map((tab, index) => (
        <TabsContent
          value={tab.slug}
          key={index}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-4"
        >
          {renderBookingsByStatus(statusSlug)}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export const ResaervationListTabsSkeleton = () => {
  return (
    <div className="space-y-4">
      <div>
        <Skeleton className="h-10" />
      </div>
      <div className=" flex flex-wrap gap-5">
        {Array(7)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-[240px] w-[250px] rounded-xl" />
          ))}
      </div>
    </div>
  );
};
export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
