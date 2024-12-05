import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Input } from '~/components/ui/input';

export function PropertySearch() {
  return (
    <div>
      <div className="flex items-center gap-3 p-4 rounded-lg bg-white hover:shadow-md transition-shadow md:max-w-[240px] w-full">
        <FaMapMarkerAlt className="text-primary text-lg" />
        <Input type="text" placeholder="Destination" className="rounded-lg" />
      </div>
    </div>
  );
}
