'use client';

import React, { useEffect, useRef, useState } from 'react';
import roomsApi from '~/api/rooms/api';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { RoomTypesPhotoUpload } from '~/feature/become-a-host/';
import { useAppSelector } from '~/store/hooks';
export default function Page() {
  const propertyId = useAppSelector((state) => state.propertySlice.propertyId);
  const [roomTypeId, setRoomTypeId] = useState<number | null>(null);
  const { data: rooms } = roomsApi.endpoints.getRoomTypesByPropertyId.useQuery({
    propertyId: propertyId,
  });
  useEffect(() => {
    if (rooms && rooms.length > 0 && roomTypeId === null) {
      setRoomTypeId(rooms[0].id);
    }
  }, [rooms, roomTypeId]);

  console.log('ansar', rooms);
  return (
    <div className="w-full h-full  ">
      <div className="flex justify-between flex-wrap gap-4">
        <div className="text-lg">{`Select which room type's photo to change`}</div>
        <div>
          <Select
            onValueChange={(value) => {
              setRoomTypeId(parseInt(value));
            }}
            disabled={!rooms || rooms.length === 0}
            value={roomTypeId?.toString()}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {rooms?.map((roomType) => (
                  <SelectItem key={roomType.id} value={roomType.id.toString()}>
                    {roomType.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {roomTypeId && rooms && (
        <RoomTypesPhotoUpload
          roomTypeId={roomTypeId.toString()}
          roomTypePhotos={rooms.find((room) => room.id === roomTypeId)?.roomTypePhotos || []}
        />
      )}
    </div>
  );
}
