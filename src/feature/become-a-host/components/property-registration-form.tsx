'use client';
import React, { useEffect, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FormProvider } from '~/components/hook-form/form-provider';
import { LoadingButton } from '~/components/ui/loading-button';
import { RHFTextArea, RHFSelect, RHFTextField } from '~/components/hook-form';
import propertyApi from '~/api/property/api';
import { useToast } from '~/components/ui/use-toast';
import { ToastAction } from '~/components/ui/toast';
import { Cities, PropertyRequest } from '~/api/property/types';
type FormValuesProps = {
  name: string;
  address: string;
  postalCode: string;
  description: string;
  contactName: string;
  contactPhone: string;
  propertyType: string;
  cityId: string;
  treatments?: number[];
  services?: number[];
};

const PropertyRegistrationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  postalCode: Yup.string().required('Postal code is required'),
  description: Yup.string().required('Description is required'),
  contactName: Yup.string().required('Contact name is required'),
  contactPhone: Yup.string().required('Contact phone is required'),
  propertyType: Yup.string().required('Property type is required'),
  cityId: Yup.string().required('City ID is required'),
  treatments: Yup.array().of(Yup.number()).notRequired().default([]),
  services: Yup.array().of(Yup.number()).notRequired().default([]),
});
interface Props {
  property?: PropertyRequest | undefined;
  closeModal?: () => void;
}

export function PropertyRegistrationForm({ property, closeModal }: Props) {
  const defaultValues = {
    name: property?.name || '',
    address: property?.address || '',
    postalCode: property?.postalCode || '',
    description: property?.description || '',
    contactName: property?.contactName || '',
    contactPhone: property?.contactPhone || '',
    propertyType: property?.propertyType || '',
    cityId: property?.cityId?.toString() || '',
    treatments: property?.treatments || [],
    services: property?.services || [],
  };
  const { data: cities, isLoading: citiesLoading } = propertyApi.endpoints.getCities.useQuery({});

  const [editProperty] = propertyApi.endpoints.editOwnerProperty.useMutation();
  const [createProperty] = propertyApi.endpoints.createProperty.useMutation();

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(PropertyRegistrationSchema) as Resolver<FormValuesProps>,
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const { toast } = useToast();
  const cityOptions = useMemo(
    () =>
      cities?.map((city) => ({
        label: city.name,
        value: city.id.toString(),
      })),
    [cities],
  );
  const onSubmit = async (data: FormValuesProps) => {
    if (property) {
      const res = await editProperty({
        id: property.id ? property?.id.toString() : '2',
        data: { ...data, cityId: +data.cityId },
      }).unwrap();
      toast({
        title: 'Property updated',
        description: 'Property has been updated successfully',
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    } else {
      await createProperty({ ...data, cityId: +data.cityId });
      toast({
        title: 'Property created',
        description: 'Property has been created successfully',
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
    try {
    } catch (error: any) {
      console.error('Failed to submit property:', error);
      toast({
        title: 'Error',
        description: `Failed to ${property ? 'update' : 'create'} property.`,
      });
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
        <RHFTextField name="name" label="Name" />
        <RHFTextField name="address" label="Address" />
        <RHFTextField name="postalCode" label="Postal Code" />
        <RHFTextField name="contactName" label="Contact Name" />
        <RHFTextField name="contactPhone" label="Contact Phone" />
        <RHFSelect name="cityId" label="City" options={cityOptions || []} />

        <RHFSelect
          name="propertyType"
          label="Property Type"
          options={[
            { label: 'Sanatorium', value: 'SANATORIUM' },
            { label: 'Hotel', value: 'HOTEL' },
          ]}
        />
        <div className="col-span-3">
          <RHFTextArea name="description" label="Description" />
        </div>
      </div>
      <LoadingButton type="submit" isLoading={isSubmitting}>
        Save
      </LoadingButton>
    </FormProvider>
  );
}
