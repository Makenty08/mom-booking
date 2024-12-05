'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { DateRangePicker } from '~/components/date-range-picker';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { PopoverGuests } from '~/feature/search/components/popover/popover-guests';
import { useAppSelector } from '~/store/hooks';
import { SelectRoomTypeUer } from './select-room-type-user';
import propertyApi from '~/api/property/api';
import roomsApi from '~/api/rooms/api';
export function ReservationCheckout() {
  const router = useRouter();
  const params = useParams();
  const { data: roomTypes } = roomsApi.endpoints.getRoomTypesByPropertyId.useQuery({
    propertyId: params.id as string,
  });
  console.log(roomTypes, 232);
  const [priceList, setPriceList] = React.useState<number[]>([]);
  useEffect(() => {
    if (!roomTypes) return;
    setPriceList(roomTypes.map((room) => room.pricePerDay).sort((a, b) => a - b));
  }, [roomTypes]);
  console.log(priceList, 2323);

  return (
    <div className="border rounded-2xl p-6 space-y-4 w-full bg-slate-50 ">
      <div className="space-x-2">
        <span className="text-lg font-semibold">From {priceList![0]}$</span>
        <span className="text-sm from-neutral-400">per night</span>
      </div>
      <div className="flex flex-col gap-4">
        <DateRangePicker className="  bg-white" />
        <SelectRoomTypeUer />
        <Button onClick={() => router.push('/checkout')}>Checkout</Button>
        {/* <Button onClick={() => router.push('3/partnership')} variant="secondary">
          Become a parner
        </Button> */}
      </div>
    </div>
  );
}
