'use client';
import React, { useEffect } from 'react';
import roomsApi from '~/api/rooms/api';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useAppSelector } from '~/store/hooks';
import { RoomFacilitiesForm } from '~/feature/become-a-host';
export default function Page() {
  const [roomTypeId, setRoomTypeId] = React.useState<number | null>(null);
  const { data: facilities } = roomsApi.endpoints.getRoomFacilities.useQuery(null);

  const propertyId = useAppSelector((state) => state.propertySlice.propertyId);
  const { data: roomTypes, isLoading } = roomsApi.endpoints.getRoomTypesByPropertyId.useQuery({
    propertyId,
  });
  useEffect(() => {
    if (roomTypes && roomTypes.length > 0 && roomTypeId === null) {
      setRoomTypeId(roomTypes[0].id);
    }
  }, [roomTypes, roomTypeId]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex justify-between flex-row">
        <div className=" text-left">
          <div className="text-3xl font-semibold">Now lets choose amenities for room types </div>
          <div className="text-xl text-slate-400">
            You can add more amenities after you publish your listing.
          </div>
        </div>
        <Select
          onValueChange={(value) => {
            setRoomTypeId(parseInt(value));
          }}
          value={roomTypeId?.toString()}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a room type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {roomTypes?.map((roomType) => (
                <SelectItem key={roomType.id} value={roomType.id.toString()}>
                  {roomType.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 items-center justify-center">
        {facilities && roomTypes && roomTypeId ? (
          <RoomFacilitiesForm
            facilities={facilities}
            selectedFacilities={
              roomTypes.find((room) => room.id === roomTypeId)?.roomTypeFacilities || []
            }
            roomTypeId={roomTypeId.toString()}
          />
        ) : (
          <div>Loading...</div> // Show loading or handle the absence of data
        )}
      </div>
    </div>
  );
}
