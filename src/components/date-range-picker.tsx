'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { formatDate } from '~/libs/date';

export function DateRangePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 10)),
  });
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (date.from) {
      dispatch({
        type: 'searchSlice/setCheckIn',
        payload: date.from.toISOString(),
      });
    }
    if (date.to) {
      dispatch({
        type: 'searchSlice/setCheckOut',
        payload: date.to.toISOString(),
      });
    }
  }, [dispatch, date.from, date.to]);
  const handleDateChange = (newDateRange: DateRange | undefined) => {
    if (newDateRange) {
      setDate(newDateRange);
      dispatch({
        type: 'searchSlice/setCheckIn',
        payload: newDateRange.from?.toISOString(),
      });
      dispatch({
        type: 'searchSlice/setCheckOut',
        payload: newDateRange.to?.toISOString(),
      });
    }
  };
  const checkIn = useAppSelector((state) => state.searchSlice.checkIn);
  const checkOut = useAppSelector((state) => state.searchSlice.checkOut);

  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-center text-left font-normal rounded-2xl h-[56px] bg-inherit border-none',
              !date && 'text-muted-foreground',
              className,
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {checkIn && checkOut ? (
              <>
                {formatDate(new Date(checkIn))} - {formatDate(new Date(checkOut))}
              </>
            ) : checkIn && checkOut ? (
              <>
                {formatDate(new Date(checkIn))} - {formatDate(new Date(checkOut))}
              </>
            ) : (
              <>
                <span>Select Dates</span>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 " align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            className="bg-inherit"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
