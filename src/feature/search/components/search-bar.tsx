'use client';
import React from 'react';

import { DateRangePicker } from '~/components/date-range-picker';
import { PopoverGuests } from './popover/popover-guests';
import { LayoutSearchItem } from './layout-search-item';
import { PopoverDestination } from './popover/popover-destination';
import { useResponsive } from '~/hooks/use-responsive';

import { DrawerDemo } from './drawer/drawer-search-mobile';
import { useAppSelector } from '~/store/hooks';
import propertyApi from '~/api/property/api';
import Image from 'next/image';

export function SearchBar({ onSubmit }: { onSubmit: (e: any) => void }) {
  const isDesktop = useResponsive('up', 'md');

  return (
    <form onSubmit={onSubmit}>
      {isDesktop && (
        <div className="text-center flex justify-center">
          <div className="border-2 rounded-full border-gray-20 shadow-md max-w-[850px] w-full">
            <div className="flex items-center flex-row">
              <LayoutSearchItem className="p-6">
                <PopoverDestination />
              </LayoutSearchItem>
              <LayoutSearchItem className="p-3.5">
                <DateRangePicker className="" />
              </LayoutSearchItem>
              <LayoutSearchItem className="p-8">
                <PopoverGuests />
              </LayoutSearchItem>
              <button
                type="submit"
                className="mx-4 flex items-center p-3 rounded-full bg-[#FF385C] hover:bg-[#E00B41] gap-1"
              >
                <Image src="/static/search.svg" alt="search" width={80} height={80} />
              </button>
            </div>
          </div>
        </div>
      )}
      {!isDesktop && <DrawerDemo />}
    </form>
  );
}
