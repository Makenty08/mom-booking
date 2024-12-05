import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation'; // Corrected from 'next/navigation'
import { Heart, Star } from 'lucide-react';
import { Property } from '~/api/property/types';

interface Props {
  src: string;
  propertyCoverPhotoId: number;
  property: Property;
}

export function PropertyCard({ src, propertyCoverPhotoId, property }: Props) {
  const router = useRouter();

  const handleImageError = (event: any) => {
    event.target.src = '/default-property-image.png'; // Path to a default image
  };

  const imageUrl = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}photo/${propertyCoverPhotoId}`
    : src;

  return (
    <div
      className="w-full aspect-[4/3] hover:cursor-pointer"
      onClick={() => router.push(`/property/${property.id}`)}
    >
      <div className="relative aspect-square">
        <button className="absolute top-3 right-3" aria-label="Add to favorites">
          <Heart size="24" color="white" />
        </button>
        <Image
          className="object-cover h-full rounded-xl"
          src={imageUrl}
          alt="Property Image"
          width={500}
          height={500}
          onError={handleImageError}
        />
      </div>

      <div className="flex justify-between">
        <div className="text-lg font-medium">
          <span>
            {property?.name}, {property?.id}
          </span>
        </div>
        <div className="flex items-center">
          <Star size={16} fill="black" />
          {property.rating === 0 ? '4.2' : property.rating}
        </div>
      </div>
      <div className="text-neutral-500 line-clamp-2">{property.description}</div>
      <div>
        <span className="font-semibold">${property.minPricePerDay ?? 100}</span>{' '}
        <span>per night</span>
      </div>
    </div>
  );
}
