import { ReloadIcon } from '@radix-ui/react-icons';

import { Button, ButtonProps } from './button';
import React from 'react';
import { cn } from '~/lib/utils';
type Props = {
  isLoading: boolean;
  children: React.ReactNode;
} & ButtonProps;

export function LoadingButton({ isLoading, children, className, ...other }: Props) {
  return (
    <>
      {isLoading ? (
        <Button disabled className={`${cn('w-full', className)}`} {...other}>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          {children}
        </Button>
      ) : (
        <Button className={`${cn('w-full', className)}`} {...other}>
          {children}
        </Button>
      )}
    </>
  );
}
