'use client';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Button } from '~/components/ui/button';
import { useAppSelector } from '~/store/hooks';
import { RHFCheckbox } from '~/components/hook-form/rhf-checkbox';
import { RoomFacilitiesIcons } from '~/components/room-facilities-icons';
import roomsApi from '~/api/rooms/api';
import { Facility, RoomTypeFacility } from '~/api/rooms/types';

type PropertyServiceKey = keyof typeof RoomFacilitiesIcons;

type FormValues = {
  [key: string]: boolean;
};
const generateDefaultValues = (
  facilities: Facility[],
  selectedFacilities: RoomTypeFacility[] = [],
): FormValues => {
  return facilities.reduce((acc, facility) => {
    const isSelected = selectedFacilities.some((item) => item.facility.id === facility.id);
    return {
      ...acc,
      [facility.slug]: isSelected,
    };
  }, {});
};

interface FormProps {
  facilities: Facility[];
  selectedFacilities: RoomTypeFacility[];
  roomTypeId: string;
}

export function RoomFacilitiesForm({ facilities, selectedFacilities, roomTypeId }: FormProps) {
  const [editRoomType] = roomsApi.endpoints.editRoomType.useMutation();

  const propertyId = useAppSelector((state) => state.propertySlice.propertyId);
  const schema = facilities
    ? Yup.object().shape(
        facilities.reduce(
          (acc, service) => ({
            ...acc,
            [service.slug]: Yup.boolean().defined(
              `Selecting a value for ${service.name} is required.`,
            ),
          }),
          {},
        ),
      )
    : Yup.object();

  const formMethods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: generateDefaultValues(facilities, selectedFacilities || []),
  });

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (facilities && selectedFacilities) {
      reset(generateDefaultValues(facilities, selectedFacilities));
    }
  }, [facilities, selectedFacilities, reset]);

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    if (propertyId) {
      try {
        const selectedFacilities = facilities
          ?.filter((item) => data[item.slug])
          .map((item) => item.id);
        console.log(selectedFacilities);
        const response = await editRoomType({
          propertyId: +propertyId,
          roomTypeId,
          body: { facilityIds: selectedFacilities },
        }).unwrap();
        console.log('Save successful:', response);
      } catch (error) {
        console.error('Failed to save services:', error);
      }
    } else {
      console.error('Property ID is not available');
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {facilities?.map((service) => (
            <RHFCheckbox
              key={service.id}
              name={service.slug}
              label={service.name}
              description={RoomFacilitiesIcons[service.slug as PropertyServiceKey]}
            />
          ))}
        </div>

        <Button type="submit">Save</Button>
      </form>
    </FormProvider>
  );
}
