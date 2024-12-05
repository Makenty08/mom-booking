import * as React from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer';
import { Search } from 'lucide-react';
import { PopoverGuests } from '../popover/popover-guests';
import { DateRangePicker } from '~/components/date-range-picker';
import { PopoverDestination } from '../popover/popover-destination';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export function DrawerDemo() {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState([
    { name: 'Взрослые', age: 'От 13 лет', count: 0, keyName: 'adults' },
    { name: 'Дети', age: '2-12 лет', count: 0, keyName: 'children' },
    { name: 'Младенцы', age: 'До 2 лет', count: 0, keyName: 'infants' },
  ]);
  React.useEffect(() => {
    dispatch({
      type: 'searchSlice/setGuestNumber',
      payload: data.reduce((acc, item) => acc + item.count, 0),
    });
  }, [data, dispatch]);
  const guests = useAppSelector((state) => state.searchSlice.guestNumber);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="bg-[#E9F0F3] w-full rounded-full mt-3 py-4 px-3 flex flex-row gap-4 justify-start items-center">
          <Search />
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-left">Искать Везде</span>
            <div className="flex flex-row gap-2">
              <span className="text-xs">Week</span>
              <span className="text-xs">Who goes?</span>
            </div>
          </div>
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-[50vh] px-5 mt-2">
        <PopoverDestination />
        <DateRangePicker className="bg-slate-50 mt-2 rounded-2xl items-center shadow-md" />
        <PopoverGuests />
      </DrawerContent>
    </Drawer>
  );
}
