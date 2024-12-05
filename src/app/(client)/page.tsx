'use client';
import { useEffect, useState } from 'react';
import propertyApi from '~/api/property/api';
import { Card } from '~/feature/_birzhan/Card';
import { Navbar } from '~/feature/_birzhan/HomePage/Navbar';
import { Search } from '~/feature/_birzhan/HomePage/SearchComponent';
import { Info } from '~/feature/_birzhan/HomePage/info-coming';
import { PropertyCard, PropertySearch, SkeletonOwnerPropertyCard } from '~/feature/property';
import { SearchBar } from '~/feature/search';
import { useAppSelector } from '~/store/hooks';

export default function Home() {
  const [filterSearch, setFilterSearch] = useState({});

  const { cityId, checkIn, checkOut, guestNumber } = useAppSelector((state) => state.searchSlice);
  const [getProperties, { data: property, isLoading, isFetching }] =
    propertyApi.useLazyGetPropertiesQuery();
  useEffect(() => {
    getProperties({});
  }, [getProperties]);
  console.log(property);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getProperties({ cityId, checkIn, checkOut, capacity: guestNumber });
  };

  return (
    <main className=" h-full space-y-6 px-5">
      <SearchBar
        onSubmit={(e: any) => {
          onSubmit(e);
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
        {isLoading || isFetching
          ? Array(8)
              .fill(2)
              .map((_, index) => <SkeletonOwnerPropertyCard key={index} />)
          : property?.map((property) => (
              <PropertyCard
                key={property.id}
                src="/static/maldives2.webp"
                propertyCoverPhotoId={property.propertyPhotos![0]?.photo.id}
                property={property}
              />
            ))}

        {/* <PropertyCard src="/static/maldives.webp" />
        
        <PropertyCard src="/static/ritz.avif" />

        <PropertyCard src="/static/homealone.webp" />
        <PropertyCard src="/static/room.jpg" />

        <PropertyCard src="/static/sheraton1.jpeg" />
        <PropertyCard src="/static/sheraton2.jpeg" />
        <PropertyCard src="/static/sheraton3.jpeg" />
        <PropertyCard src="/static/stregis1.jpeg" />
        <PropertyCard src="/static/stregis2.jpeg" />
        <PropertyCard src="/static/stregis3.jpeg" />

        <PropertyCard src="/static/maldives.webp" />
        <PropertyCard src="/static/maldives2.webp" />
        <PropertyCard src="/static/ritz.avif" />

        <PropertyCard src="/static/homealone.webp" />
        <PropertyCard src="/static/room.jpg" />

        <PropertyCard src="/static/sheraton1.jpeg" />
        <PropertyCard src="/static/sheraton2.jpeg" />
        <PropertyCard src="/static/sheraton3.jpeg" />
        <PropertyCard src="/static/stregis1.jpeg" />
        <PropertyCard src="/static/stregis2.jpeg" />
        <PropertyCard src="/static/stregis3.jpeg" />

        <PropertyCard src="/static/HomeImage.svg" />
        <PropertyCard src="/static/homealone.webp" />
        <PropertyCard src="/static/room.jpg" /> */}
      </div>
    </main>
  );
}
