import React from 'react';
import { Frown } from 'lucide-react';

export function EmptyCard() {
  return (
    <div className="w-full col-span-full bg-slate-100 h-64 sm:h-52 flex flex-col items-center justify-center rounded-2xl py-40 ">
      <div>
        <Frown size={130} />
      </div>
      <div className="text-lg text-center">No results found</div>
    </div>
  );
}
