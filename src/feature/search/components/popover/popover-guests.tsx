import { Popover } from '@radix-ui/react-popover';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { useResponsive } from '~/hooks/use-responsive';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export interface IGuest {
  data: { name: string; age: string; count: number; keyName: string }[];
  setData: React.Dispatch<
    React.SetStateAction<{ name: string; age: string; count: number; keyName: string }[]>
  >;
}

export function PopoverGuests() {
  const dispatch = useAppDispatch();
  const [countPerson, setCountPerson] = React.useState(0);
  const [data, setData] = React.useState([
    { name: 'Взрослые', age: 'От 13 лет', count: 0, keyName: 'adults' },
    { name: 'Дети', age: '2-12 лет', count: 0, keyName: 'children' },
    { name: 'Младенцы', age: 'До 2 лет', count: 0, keyName: 'infants' },
  ]);
  useEffect(() => {
    dispatch({
      type: 'searchSlice/setGuestNumber',
      payload: data.reduce((acc, item) => acc + item.count, 0),
    });
  }, [data, dispatch]);
  const guests = useAppSelector((state) => state.searchSlice.guestNumber);
  const isDesktop = useResponsive('up', 'md');
  const [opened, setOpened] = React.useState(false);
  const guestNumber = useAppSelector((state) => state.searchSlice.guestNumber);
  console.log(guestNumber, 222);
  useEffect(() => {
    dispatch({
      type: 'searchSlice/setGuestNumber',
      payload: data.reduce((acc, item) => acc + item.count, 0),
    });
  }, [data, dispatch]);
  return (
    <Popover open={opened} onOpenChange={(open) => setOpened(open)}>
      <PopoverTrigger asChild>
        {isDesktop ? (
          <button className="flex flex-row items-center justify-center w-full px-1">
            <div className="ml-4 flex flex-row gap-2 items-center">
              <div className="font-medium text-sm whitespace-nowrap">Who goes?</div>
              <div className="font-bold text-sm text-left">
                {data.reduce((acc, item) => acc + item.count, 0) > 0
                  ? guestNumber && guestNumber > 0
                    ? guestNumber
                    : data.reduce((acc, item) => acc + item.count, 0)
                  : 'Count'}
              </div>
            </div>
          </button>
        ) : (
          <button className="flex justify-between border-2 rounded-2xl py-3 px-4 items-center mt-5 bg-[#E9F0F3] h-[56px] w-full">
            <span className="font-normal text-sm text-slate-500">
              {data.reduce((acc, item) => acc + item.count, 0) > 0
                ? guestNumber && guestNumber > 0
                  ? guestNumber
                  : data.reduce((acc, item) => acc + item.count, 0)
                : 'Count'}
            </span>
            <span className="font-bold text-sm">How many?</span>
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent className="rounded-[8px] mt-3 right-0 border-1 px-8 py-4 w-[350px]">
        {data.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-light text-xs">{item.age}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="bg-secondary rounded-full p-2 border-2 hover:border-slate-700"
                    onClick={() =>
                      setData((prev) =>
                        prev.map((prevItem) =>
                          prevItem.keyName === item.keyName
                            ? { ...prevItem, count: prevItem.count - 1 }
                            : prevItem,
                        ),
                      )
                    }
                  >
                    <FaMinus size="12" />
                  </button>
                  <span className="f font-medium text-primary">{item.count}</span>
                  <button
                    className="bg-secondary rounded-full p-2 border-2 hover:border-slate-700"
                    onClick={() => {
                      setData((prev) =>
                        prev.map((prevItem) =>
                          prevItem.keyName === item.keyName
                            ? { ...prevItem, count: prevItem.count + 1 }
                            : prevItem,
                        ),
                      );
                      dispatch({
                        type: 'searchSlice/setGuestNumber',
                        payload: data.reduce((acc, item) => acc + item.count, 0),
                      });
                    }}
                  >
                    <FaPlus size="12" />
                  </button>
                </div>
              </div>
              <hr className="mb-5" />
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
