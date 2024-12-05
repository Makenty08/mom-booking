'use client';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import propertyApi from '~/api/property/api';
import { Button } from '~/components/ui/button';
import { useAppSelector } from '~/store/hooks';
import { RHFCheckbox } from '~/components/hook-form/rhf-checkbox';
import { PropertyServices, Service } from '~/api/property/types';
import { PropertyServicesIcons } from '~/components/services-icons';

type PropertyServiceKey = keyof typeof PropertyServicesIcons;

type FormValues = {
  [key: string]: boolean;
};
const generateDefaultValues = (
  services: Service[],
  selectedServices: PropertyServices = [],
): FormValues => {
  return services.reduce((acc, service) => {
    const isSelected = selectedServices.some((item) => item.service.id === service.id);
    return {
      ...acc,
      [service.slug]: isSelected,
    };
  }, {});
};

interface FormProps {
  services: Service[];
  selectedServices: PropertyServices;
}

export function PropertyServicesForm2({ services, selectedServices }: FormProps) {
  const [editProperty] = propertyApi.endpoints.editOwnerProperty.useMutation();
  const propertyId = useAppSelector((state) => state.propertySlice.propertyId);
  console.log(selectedServices);
  const schema = services
    ? Yup.object().shape(
        services.reduce(
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
    defaultValues: generateDefaultValues(services, selectedServices || []),
  });

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (services && selectedServices) {
      reset(generateDefaultValues(services, selectedServices));
    }
  }, [services, selectedServices, reset]);

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    if (propertyId) {
      try {
        const selectedServices = services?.filter((item) => data[item.slug]).map((item) => item.id);
        console.log(selectedServices);
        const response = await editProperty({
          data: { services: selectedServices },
          id: propertyId.toString(),
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
          {services?.map((service) => (
            <RHFCheckbox
              key={service.id}
              name={service.slug}
              label={service.name}
              description={PropertyServicesIcons[service.slug as PropertyServiceKey]}
            />
          ))}
        </div>

        <Button type="submit">Save</Button>
      </form>
    </FormProvider>
  );
}
