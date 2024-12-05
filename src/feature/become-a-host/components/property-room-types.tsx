'use client';
import React from 'react';

import Image from 'next/image';
import roomsApi from '~/api/rooms/api';
import { Roomtype } from '~/api/rooms/types';
import { Edit, Trash2Icon } from 'lucide-react';
import { useToast } from '~/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { EmptyCard } from '~/feature/reservation/components/reservations-summary/empty-card';
import { RoomTypesForm } from './room-types-form';
import { SkeletonOwnerPropertyCard } from '~/feature/property/components/skeleton-property-card';
import { useAppSelector } from '~/store/hooks';

interface Props {
  roomTypes: Roomtype[] | undefined;
  isLoading: boolean;
}
export function PropertyRoomTypes({ roomTypes, isLoading }: Props) {
  const { toast } = useToast();
  const [openDialogs, setOpenDialogs] = React.useState<Record<number, boolean>>({});
  const propertyId = useAppSelector((state) => state.propertySlice.propertyId);

  const [deleteRoomType, { isLoading: isLoadingDelete }] =
    roomsApi.endpoints.deleteRoomType.useMutation();

  const deleteRoomTypeHandler = (propertyId: string, roomTypeId: number) => {
    deleteRoomType({ propertyId, roomTypeId });
    toast({
      title: 'Room type deleted',
      description: 'Room type has been deleted successfully',
      action: <ToastAction altText="Retry">Undo</ToastAction>,
    });
  };
  const handleOpenDialog = (id: number) => {
    setOpenDialogs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCloseDialog = (id: number) => {
    setOpenDialogs((prev) => ({ ...prev, [id]: false }));
  };
  return (
    <div className="mt-10 space-y-8 mb-4">
      <div className="flex">
        <div className="flex-1">
          <div className="text-3xl font-semibold">{`Let's now check room types`}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {roomTypes?.length == 0 && <EmptyCard />}

        {isLoading
          ? Array(4)
              .fill(2)
              .map((_, index) => <SkeletonOwnerPropertyCard key={index} />)
          : roomTypes?.map((roomType) => (
              <div key={roomType.id} className="w-full aspect-[4/3] hover:cursor-pointer">
                <div className="relative aspect-square">
                  <Dialog
                    modal={true}
                    open={openDialogs[roomType.id]}
                    onOpenChange={() => {
                      handleOpenDialog(roomType.id);
                    }}
                  >
                    <DialogTrigger asChild>
                      <button className="absolute top-3 left-2">
                        <Edit size="24" color="white" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px]">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when done.
                        </DialogDescription>
                      </DialogHeader>
                      <RoomTypesForm
                        closeModal={() => handleCloseDialog(roomType.id)}
                        roomType={roomType}
                        isEdit={true}
                      />
                    </DialogContent>
                  </Dialog>
                  <button
                    className="absolute top-3 right-2"
                    onClick={() => {
                      deleteRoomTypeHandler(propertyId, roomType.id);
                    }}
                  >
                    <Trash2Icon size="24" color="white" />
                  </button>
                  <Image
                    className="object-cover h-full rounded-xl"
                    src={'/static/room.jpg'}
                    alt="Sheraton Hotel"
                    width={500}
                    height={500}
                  />
                </div>

                <div className="flex justify-between">
                  <div className="text-lg font-medium">
                    <span>Room type: {roomType.name}</span>
                  </div>
                </div>
                <div className="text-neutral-500">${roomType.pricePerDay} per day</div>
                <div>
                  <span className="font-semibold">Capacity:</span> <span>{roomType.capacity}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
