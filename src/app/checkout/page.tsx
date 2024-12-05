'use client';
import { ToastAction } from '@radix-ui/react-toast';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import bookingApi from '~/api/booking/api';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { LoadingButton } from '~/components/ui/loading-button';
import { useToast } from '~/components/ui/use-toast';
import { useAppSelector } from '~/store/hooks';

export default function CheckoutPage() {
  const router = useRouter();
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [isLoadingBooking, setIsLoadingBooking] = useState(false);
  const { guestNumber, checkIn, checkOut, bookingUserRoomTypeId } = useAppSelector(
    (state) => state.searchSlice,
  );
  const { toast } = useToast();

  const [createBooking, { data, isLoading }] = bookingApi.endpoints.createBooking.useMutation();

  const createBookingFunction = () => {
    createBooking({
      checkIn,
      checkOut,
      roomTypeId: bookingUserRoomTypeId,
    })
      .unwrap()
      .then(() => {
        setIsLoadingBooking(false);
        toast({
          title: 'Booking created',
          description: 'Your booking has been successfully created.',
          action: <ToastAction altText="View Status">Check Status</ToastAction>,
        });
        router.push('/reservations');
      })
      .catch(() => {
        setIsLoadingBooking(false);
        toast({
          title: 'Error',
          description: 'An error occurred while submitting your application. Please try again.',
        });
      });
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Payment Details</h2>

        <Input name="cardName" placeholder="John Doe" />
        <Input name="cardNumber" placeholder="1234 5678 9101 1121" />
        <div className="grid grid-cols-2 gap-4">
          <Input name="cardExpiration" placeholder="MM/YY" />
          <Input name="cardCvv" placeholder="123" />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">Have a promo code?</span>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowPromoCode(!showPromoCode)}
          >
            {showPromoCode ? 'Hide' : 'Enter Code'}
          </Button>
        </div>

        {showPromoCode && <Input name="promoCode" placeholder="Enter your promo code" />}

        <LoadingButton
          type="submit"
          isLoading={isLoadingBooking}
          onClick={() => {
            setIsLoadingBooking(true);
            setTimeout(() => {
              createBookingFunction();
            }, 1500);
          }}
        >
          Pay Now
        </LoadingButton>
      </div>
    </div>
  );
}
