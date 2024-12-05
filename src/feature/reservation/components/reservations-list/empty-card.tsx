import React from 'react';

export function EmptyCard() {
  return (
    <div className="w-full col-span-full bg-slate-100 h-64 sm:h-52 flex flex-col items-center justify-center rounded-2xl py-40 ">
      <div className="text-5xl text-center font-semibold">No reservations</div>
    </div>
  );
}
