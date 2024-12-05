import React from 'react';
import bookingApi from '~/api/booking/api';
import { Booking } from '~/api/booking/types';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

interface Props {
  booking: Booking;
}

export function ListTabCard({ booking }: Props) {
  const { status } = booking;
  const [changeStatus] = bookingApi.endpoints.changeStatus.useMutation();
  const handleChangeStatus = (status: string) => {
    changeStatus({ data: { ...booking, status }, bookingId: booking.id.toString() });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{booking.user.firstName}</CardTitle>
        <CardDescription>{booking.user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>{booking.checkIn}</div>

        <div>{booking.checkOut}</div>
      </CardContent>
      <CardFooter className="flex justify-end">
        {status === 'PENDING' && (
          <>
            <Button onClick={() => handleChangeStatus('CONFIRMED')}>Confirm</Button>
          </>
        )}
        {status === 'CONFIRMED' && (
          <>
            <Button onClick={() => handleChangeStatus('CANCELED')} variant={'destructive'}>
              CANCEL
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
