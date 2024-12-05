'use client';

import { Button } from '~/components/ui/button';
import { RegistrationSteps } from './regisration-steps';
import { useState } from 'react';

export function RegistrationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between px-5 sm:px-10 md:px-14 lg:px-20 min-h-screen">
      <div className="flex items-center h-20">
        <div className="text-2xl font-bold">Sanatopia</div>
      </div>

      <div className="flex-1 flex items-center justify-center ">{children}</div>

      <div className="mt-10">
        <RegistrationSteps />
      </div>
    </div>
  );
}
