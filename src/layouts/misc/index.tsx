'use client';
import React from 'react';
import { Header } from './header';
import { useResponsive } from '~/hooks/use-responsive';
import { BottomNavigation } from '~/components/bottom-navigation';

interface Props {
  children: React.ReactNode;
}

export function MiscLayout({ children }: Props) {
  const isDesktop = useResponsive('up', 'md');

  return (
    <>
      {isDesktop && (
        <div className="px-5 sm:px-10 md:px-14 lg:px-20 ">
          <Header />
        </div>
      )}

      <div className="border-t border-gray-200 hidden md:block" />

      <div className={` px-0 sm:px-0 md:px-14 lg:px-20 md:mt-5`}>{children}</div>

      {!isDesktop && (
        <div className="fixed inset-x-0 bottom-0">
          <BottomNavigation />
        </div>
      )}
    </>
  );
}
