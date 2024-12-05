import React from 'react';
import Image from 'next/image';
import { RoomType } from '~/api/property/types';
import { Roomtype } from '~/api/rooms/types';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

export function RoomTypeCard({ room }: { room: any }) {
  console.log(room, 23235);

  return (
    <div className="space-y-2 ">
      <div className="rounded-xl overflow-hidden">
        <Dialog>
          <DialogTrigger>
            {' '}
            <button className="h-full">
              <Image
                className="object-cover h-full w-full "
                src={
                  room.roomTypePhotos[0]
                    ? `${process.env.NEXT_PUBLIC_API_URL}photo/${room.roomTypePhotos[0].photoId}`
                    : '/images/room.jpg'
                }
                alt="room"
                width={350}
                height={250}
              />
            </button>
          </DialogTrigger>
          <DialogContent className="h-fit">
            <DialogHeader>
              <DialogTitle>Description about: {room.name}</DialogTitle>
              <DialogDescription>
                <div className="text-sm font-semibold my-4">
                  Surface area: {room.surfaceArea} m<sup>2</sup>
                </div>
                <div className="text-sm from-neutral-200 font-medium">{room.description}</div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="pl-2 flex flex-col">
        <span className="text-base font-medium">{room.name}</span>
        <span className="text-sm font-normal">{room.capacity} beds</span>
        <span className="text-sm font-normal">Price per data: ${room.pricePerDay}</span>
      </div>
    </div>
  );
}
