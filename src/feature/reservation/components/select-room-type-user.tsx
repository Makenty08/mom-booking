'use client';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import roomsApi from '~/api/rooms/api';
import { DateRangePicker } from '~/components/date-range-picker';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { PopoverGuests } from '~/feature/search/components/popover/popover-guests';
import { setBookingUserRoomTypeId } from '~/feature/search/searchSlice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
export function SelectRoomTypeUer() {
  const { bookingUserRoomTypeId } = useAppSelector((state) => state.searchSlice);
  const [roomTypeValue, setRoomTypeValue] = React.useState<number | undefined>(
    Number(bookingUserRoomTypeId) || undefined,
  );
  const dispatch = useAppDispatch();
  const params = useParams();

  const { data: roomTypes } = roomsApi.endpoints.getRoomTypesByPropertyId.useQuery({
    propertyId: params.id as string,
  });

  return (
    <Select
      onValueChange={(value) => {
        setRoomTypeValue(+value);
        dispatch(setBookingUserRoomTypeId(+value));
      }}
      value={roomTypeValue?.toString()}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a room type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Room types</SelectLabel>
          <SelectItem value="0">All cities</SelectItem>
          {roomTypes?.map((room) => (
            <SelectItem key={room.id} value={room.id.toString()}>
              {room.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
