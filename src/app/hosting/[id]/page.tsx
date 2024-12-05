'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import React, { useEffect } from 'react';
import bookingApi from '~/api/booking/api';
import propertyApi from '~/api/property/api';
import { Button } from '~/components/ui/button';

import { LoadingButton } from '~/components/ui/loading-button';

import { Skeleton } from '~/components/ui/skeleton';

import { addProperty } from '~/feature/property/property-slice';
import {
  ResaervationListTabsSkeleton,
  ReservationsListTabs,
} from '~/feature/reservation/components/reservations-list/reservations-list-tabs';
import { useAppDispatch } from '~/store/hooks';
export default function PropertyPage() {
  const params = useParams();
  const router = useRouter();
  const { data } = bookingApi.endpoints.getBookings.useQuery(null);
  console.log(data);
  const { data: property, isLoading } = propertyApi.endpoints.getOwnerProperty.useQuery({
    id: params?.id as string,
  });
  const [deleteProperty, { isLoading: isDeleteLoading }] =
    propertyApi.endpoints.deleteOwnerProperty.useMutation();
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(addProperty(params?.id as string));
    router.push('/become-a-host/about-your-place');
  };
  return (
    <div className="">
      <div className="mt-2 md:m-0 flex justify-between items-center flex-col md:flex-row">
        <div>
          <h4 className="text-lg font-semibold leading-none mb-4">
            {isLoading ? <Skeleton className="w-[200px] h-[20px]" /> : property?.propertyType}
          </h4>
          <p className="t text-base text-muted-foreground flex">
            Status:{' '}
            {isLoading ? <Skeleton className=" ml-2 w-[150px] h-[20px]" /> : property?.status}
          </p>
          <p className="t text-base text-muted-foreground flex">
            Name: {isLoading ? <Skeleton className=" ml-2 w-[150px] h-[20px]" /> : property?.name}
          </p>
          <p className="t text-base text-muted-foreground flex">
            Owner:{' '}
            {isLoading ? (
              <Skeleton className=" ml-2 w-[200px] h-[20px]" />
            ) : (
              property?.owner.firstName || 'Ansar'
            )}{' '}
            {property?.owner.lastName}
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <Button variant="outline" className="w-[200px] md:w-[300px]" onClick={handleEdit}>
            Edit
          </Button>

          <LoadingButton
            className="w-[200px] md:w-[300px]"
            isLoading={isDeleteLoading}
            onClick={() => {
              property &&
                deleteProperty({ id: property.id.toString() })
                  .unwrap()
                  .then(() => {
                    router.push('/hosting');
                  });
            }}
          >
            Delete
          </LoadingButton>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        <div className="flex justify-between flex-wrap">
          <div className="text-lg font-semibold">Your reservations</div>
        </div>
        {data ? <ReservationsListTabs bookings={data} /> : <ResaervationListTabsSkeleton />}

        {/* <div>
          <Link href="/hosting/reservations" className="text-pretty">
            All reservations(4)
          </Link>
        </div> */}
      </div>
    </div>
  );
}
