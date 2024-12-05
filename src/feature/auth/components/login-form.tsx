'use client';
import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import authApi from '~/api/auth/api';
import { FormProvider } from '~/components/hook-form/form-provider';
import { LoadingButton } from '~/components/ui/loading-button';
import { RHFTextField } from '~/components/hook-form/rhf-text-field';
import { useRouter } from 'next/navigation';

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const defaultValues = {
  email: '',
  password: '',
};

interface LoginFormProps {
  isClient: boolean;
}

export function LoginForm({ isClient }: LoginFormProps) {
  const [login, { isLoading }] = authApi.endpoints.login.useMutation();

  const router = useRouter();
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      console.log(data);
      if (isClient) {
        const res = await login(data)
          .unwrap()
          .then(() => router.push('/'));
        console.log(res);
      } else {
        const res = await login(data)
          .unwrap()
          .then(() => router.push('/'));

        console.log(res);
      }
    } catch (error: any) {
      console.log(error);
      setError('email', { message: 'Email is not valid', type: 'custom' });
      setError('password', { message: 'Wrong credentials', type: 'custom' });
    }
  };
  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1 mb-4">
          <RHFTextField name="email" label="Email" />
          <RHFTextField name="password" label="Password" type="password" />
        </div>
        <LoadingButton isLoading={isSubmitting}>Login</LoadingButton>
      </FormProvider>
    </div>
  );
}
