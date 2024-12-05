'use client';

import { skipToken } from '@reduxjs/toolkit/query/react';
import React from 'react';
import roomsApi from '~/api/rooms/api';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { RoomTypesForm, PropertyRoomTypes } from '~/feature/become-a-host';
import { useAppSelector } from '~/store/hooks';

export default function Page() {
  const [isOpen, setIsOpen] = React.useState(false);
  const propertyId = useAppSelector((state) => state.propertySlice.propertyId);

  const { data: roomTypes, isLoading } = roomsApi.endpoints.getRoomTypesByPropertyId.useQuery(
    propertyId ? { propertyId: propertyId.toString() } : skipToken,
    { skip: !propertyId },
  );
  console.log(roomTypes);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex justify-between flex-col md:flex-row gap-2">
        <div className="text-left">
          <div className="text-base font-semibold">Tell us about room types</div>
          <div className="text-base text-slate-400">Add room types of your property</div>
        </div>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button className="h-full " variant={'default'}>
              Add Room Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when done.
              </DialogDescription>
            </DialogHeader>
            <RoomTypesForm closeModal={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <PropertyRoomTypes roomTypes={roomTypes} isLoading={isLoading} />
    </div>
  );
}
