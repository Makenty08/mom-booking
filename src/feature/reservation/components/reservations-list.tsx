import React from 'react';
import { ReservationsListTabs } from './reservations-list/';
import { ChevronLeft } from 'lucide-react';
import { Button } from '~/components/ui/button';
export function ReservationsList() {
  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="flex-1">
          <ChevronLeft />
        </div>
        <div className="flex gap-2">
          <Button variant={'outline'} className="border-slate-800">
            Filter
          </Button>
          <Button>Export</Button>
          <Button>Print</Button>
        </div>
      </div>
      <div className="text-xl font-semibold">Reservations</div>
      <div>{/* <ReservationsListTabs /> */}</div>
    </div>
  );
}
