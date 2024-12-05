'use client';
import React from 'react';

import Image from 'next/image';

import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { cn } from '~/lib/utils';
import { Calendar } from '~/components/ui/calendar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';

export const Search = () => {
  const [checkInDate, setCheckInDate] = React.useState<Date>();
  const [checkOutDate, setCheckOutDate] = React.useState<Date>();

  return (
    <form>
      <div className=" px-2 md:px-0">
        <div className="max-w-[73rem]  w-full mx-auto my-2 bg-white rounded-[32px] p-5 shadow-xl border border-gray-100">
          <div className="flex flex-wrap items-center justify-center md:gap-6">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-white hover:shadow-md transition-shadow md:max-w-[240px] w-full">
              <FaMapMarkerAlt className="text-primary text-lg" />
              <Input type="text" placeholder="Destination" />
            </div>
            <div className="flex items-center justify-center p-4 rounded-lg bg-white hover:shadow-md transition-shadow md:max-w-[240px] w-full">
              <FaCalendarAlt className="text-primary text-lg mr-4" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !checkInDate && 'text-gray-400',
                    )}
                  >
                    {checkInDate ? checkInDate.toLocaleDateString() : 'Check-in'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={setCheckInDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="md:w-[1px] md:h-10 bg-black" />
            <div className="flex items-center justify-center p-4 rounded-lg bg-white hover:shadow-md transition-shadow md:max-w-[240px] w-full">
              <FaCalendarAlt className="text-primary text-lg mr-4" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !checkOutDate && 'text-gray-400',
                    )}
                  >
                    {checkOutDate ? checkOutDate.toLocaleDateString() : 'Check-out'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="md:w-[1px] md:h-10 bg-black" />
            <div className="flex items-center justify-center p-4 rounded-lg bg-white hover:shadow-md transition-shadow md:max-w-[240px] w-full">
              <Image
                src="/static/person.svg"
                width={24}
                height={24}
                alt="guests"
                className="text-primary text-lg mr-4"
              />
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Input type="text" placeholder="Guests" className="w-full" />
                </HoverCardTrigger>
                <HoverCardContent className="w-[300px] h-fit rounded-lg mt-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="font-medium">Взрослые</span>
                        <span className="font-light text-xs">От 13 лет</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-secondary rounded-full p-2 text-white">
                          <FaMinus />
                        </div>
                        <span className="font-bold text-primary">1</span>

                        <div className="bg-secondary rounded-full p-2 text-white">
                          <FaPlus />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="font-medium">Дети</span>
                        <span className="font-light text-xs">2–12 лет</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-secondary rounded-full p-2 text-white">
                          <FaMinus />
                        </div>
                        <span className="font-bold text-primary">1</span>

                        <div className="bg-secondary rounded-full p-2 text-white">
                          <FaPlus />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="font-medium">Младенцы</span>
                        <span className="font-light text-xs">Младше 2</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-secondary rounded-full p-2 text-white">
                          <FaMinus />
                        </div>
                        <span className="font-bold text-primary">1</span>

                        <div className="bg-secondary rounded-full p-2 text-white">
                          <FaPlus />
                        </div>
                      </div>
                    </div>
                    <Button type="button" className="rounded-[32px] w-[200px] mx-auto ">
                      Apply
                    </Button>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          <Button
            type="button"
            className="rounded-[32px] mx-auto w-full mt-6 bg-primary text-white hover:bg-primary-dark transition-colors text-lg font-semibold shadow-md flex"
          >
            Search{' '}
            <Image src="/static/Search.svg" width={20} height={20} alt="search" className="ml-1" />
          </Button>
        </div>
      </div>
    </form>
  );
};
