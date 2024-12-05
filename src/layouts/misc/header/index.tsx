import React from 'react';
import { UserDropDown } from './user-dropdown';
import { GrLanguage } from 'react-icons/gr';
import { HEADER_ROUTES } from './constants';
import Link from 'next/link';
export function Header() {
  return (
    <div className="grid grid-cols-3 h-20 justify-between gap-4 place-items-center">
      <Link href="/" className="text-2xl font-bold flex items-center justify-self-start">
        Sanatopia
      </Link>
      <div className="flex gap-4 items-center justify-self-center">
        {/* {HEADER_ROUTES.map((item, index) => (
          <div key={index} className="whitespace-nowrap">
            {item.name}
          </div>
        ))} */}
      </div>
      <div className="flex gap-6 items-center justify-self-end">
        <GrLanguage />
        <UserDropDown />
      </div>
    </div>
  );
}
