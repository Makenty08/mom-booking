'use client';

import React, { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Resolver, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FormProvider } from '~/components/hook-form/form-provider';
import { LoadingButton } from '~/components/ui/loading-button';
import { RHFTextArea, RHFSelect, RHFTextField } from '~/components/hook-form';
import { useToast } from '~/components/ui/use-toast';
import { ToastAction } from '~/components/ui/toast';

type FormValuesProps = {
  companyName: string;
  website: string;
  contactName: string;
  contactEmail: string;
  businessSize: string;
  industry: string;
  offerDetails: string;
};

const CorporateDiscountSchema = Yup.object().shape({
  companyName: Yup.string().required('Company name is required'),
  website: Yup.string().required('Website is required').url('Enter a valid URL'),
  contactName: Yup.string().required('Contact name is required'),
  contactEmail: Yup.string().required('Contact email is required').email('Enter a valid email'),
  businessSize: Yup.string().required('Business size is required'),
  industry: Yup.string().required('Industry is required'),
  offerDetails: Yup.string().required('Details of the offer are required'),
});

export default function CorporateDiscountForm() {
  const defaultValues = useMemo(
    () => ({
      companyName: '',
      website: '',
      contactName: '',
      contactEmail: '',
      businessSize: '',
      industry: '',
      offerDetails: '',
    }),
    [],
  );
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CorporateDiscountSchema) as Resolver<FormValuesProps>,
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const { toast } = useToast();

  const onSubmit = async (data: FormValuesProps) => {
    try {
      // Simulate API call
      console.log(data);
      // Assume a successful submission
      toast({
        title: 'Application Submitted',
        description: 'Your application for a corporate discount has been submitted successfully.',
        action: <ToastAction altText="View Status">Check Status</ToastAction>,
      });
    } catch (error) {
      console.error('Failed to submit application:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit your application. Please try again.',
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className=" space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RHFTextField name="companyName" label="Company Name" />
          <RHFTextField name="website" label="Website" />
          <RHFTextField name="contactName" label="Contact Name" />
          <RHFTextField name="contactEmail" label="Contact Email" />
          <RHFSelect
            name="businessSize"
            label="Business Size"
            options={[
              { label: '1-10 employees', value: '1-10' },
              { label: '11-50 employees', value: '11-50' },
              { label: '51-200 employees', value: '51-200' },
              { label: '201-500 employees', value: '201-500' },
              { label: '500+ employees', value: '500+' },
            ]}
          />
          <RHFTextField name="industry" label="Industry" />
          <div className="col-span-2">
            <RHFTextArea name="offerDetails" label="Details of the Offer" />
          </div>
        </div>
        <LoadingButton type="submit" isLoading={isSubmitting}>
          Submit Application
        </LoadingButton>
      </div>
    </FormProvider>
  );
}
