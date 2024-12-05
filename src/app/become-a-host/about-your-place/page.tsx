import React from 'react';
import Image from 'next/image';
export default function Page() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex-1 p-4 space-y-4">
        <div className="text-xl">Step 1</div>
        <div className="text-5xl font-semibold">Tell us about your place</div>
        <div>
          In this step, we&apos;ll ask you which type of property you have and if guests will book
          the entire place or just a room. Then let us know the location and how many guests can
          stay.
        </div>
      </div>
      <div className="flex-1 ">
        <Image
          className=" h-full w-full rounded-2xl"
          src="/static/room.jpg"
          alt="Sheraton Hotel"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}

{
  /* 

 Airbnb
part1
1) about your place (nothing in this page, just showing what is what)
2) structure (sanatorium hotel, house, etc)
3) privacy-type(whole property, or a room)
4) location(coiuntry, street, apartment?, City, state, postal code)
5)floor-plan (guests, bedrooms, beds, bathrooms)

part 2
6) stand-out
7) amenities(wify,tv, etc.)
8) photos
9) tittle up to 32 chars
10) description (choose up to 2 categories) up to 500 chars

part3 
11) finish-setup
12) instant-book (instantant book or Approve/decline request)
13) visibility( any or experienced)
14) price
15)legal (some questions)
*/
}

{
  /* 
    Sanatopia
    1) about-your-place
    2) structure(hotel, sanatorium, etc.) info() 
    {
  "name": "string",
  "address": "string",
  "postalCode": "string",
  "description": "string",
  "contactName": "string",
  "contactPhone": "string",
  "propertyType": "SANATORIUM"
}
    3) 
    4) /roomTypeId/room (surfaace area, price, etc.)
    5) 
    property services(wifi, etc.)location

    part2
    6) stand-out
    
    7) room-type 
    8) room facilities (shower, etc)
    9) property-photo
    10) room-photo
    
    part3 
    11) finish-setup
    12) legal(some question)

*/
}
