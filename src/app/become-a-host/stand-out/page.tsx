import React from 'react';
import Image from 'next/image';
export default function Page() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex-1 p-4 space-y-4">
        <div className="text-xl">Step 2</div>
        <div className="text-5xl font-semibold">Stand out</div>
        <div>
          In this step, we&apos;ll ask you which type of property you have and if guests will book
          the entire place or just a room. Then let us know the location and how many guests can
          stay.
        </div>
      </div>
      <div className="flex-1 ">
        <Image
          className="h-full w-full rounded-2xl"
          src="/static/room.jpg"
          alt="Sheraton Hotel"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
