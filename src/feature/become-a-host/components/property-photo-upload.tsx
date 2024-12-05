'use client';
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { useAppSelector } from '~/store/hooks';
import propertyApi from '~/api/property/api';
import { skipToken } from '@reduxjs/toolkit/query';
import { API_URL } from '~/config';
export function PropertyPhotoUpload() {
  const [photos, setPhotos] = useState<string[]>([]);

  const propertyId = useAppSelector((state) => state.propertySlice.propertyId);

  const { data: property } = propertyApi.endpoints.getProperty.useQuery(
    propertyId ? +propertyId : skipToken,
    { skip: !propertyId },
  );
  console.log('wws', property);
  const [uploadPhoto] = propertyApi.endpoints.uploadPhoto.useMutation();
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    Array.from(files).forEach((file) => {
      uploadPhoto({ propertyId, file });
    });
    propertyApi.util.invalidateTags(['Property']);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, idx) => idx !== index));
  };
  return (
    <div className="mt-10 space-y-8">
      <div className="flex">
        <div className="flex-1">
          <div className="text-3xl font-semibold">{`Let's now upload photo`}</div>
          <div className="text-xl text-slate-400">{`Upload good quality photos`}</div>
        </div>

        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <UploadPhoto handleFileChange={handleFileChange} />
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-[80%] m-auto">
        {property &&
          property.propertyPhotos.map((item) => (
            <div className="aspect-square relative" key={item.photo.id}>
              <Image
                className=" h-full w-full object-cover rounded-2xl"
                src={`${API_URL}photo/${item.photo.id}`}
                alt="Sheraton Hotel"
                width={500}
                height={500}
              />
              <button className="absolute top-3 right-3">
                <X size="20" color="white" className="bg-slate-300 rounded-md" />
              </button>{' '}
            </div>
          ))}

        {photos.map((photo, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="aspect-square w-full" key={index}>
            <Image
              className=" h-full w-full object-cover rounded-2xl "
              src={photo}
              alt="Sheraton Hotel"
              width={500}
              height={500}
            />
          </div>
        ))}
        <AdditionalPhotoUpload handleFileChange={handleFileChange} />
      </div>
    </div>
  );
}

interface UploadPhotoProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadPhoto = ({ handleFileChange }: UploadPhotoProps) => {
  return (
    <>
      <Label
        htmlFor="inputPhoto"
        className=" border-2 border-slate-600 px-2 py-3 rounded-md hover:cursor-pointer"
      >
        Upload Photo
      </Label>
      <Input
        type="file"
        id="inputPhoto"
        accept="image/*"
        onChange={handleFileChange}
        multiple
        hidden
        className="file-selector-button-none hidden"
      />
    </>
  );
};

const AdditionalPhotoUpload = ({ handleFileChange }: UploadPhotoProps) => {
  return (
    <>
      <Label
        htmlFor="inputImage"
        className="rounded-2xl border-2 border-dotted border-slate-600 px-2 py-3  hover:cursor-pointer aspect-square"
      >
        <div className=" flex flex-col items-center justify-center h-full">
          <Plus size={40} />
          <span className="text-lg"> add more</span>
        </div>
      </Label>
      <Input
        type="file"
        id="inputImage"
        accept="image/*"
        onChange={handleFileChange}
        multiple
        hidden
        className="file-selector-button-none hidden"
      />
    </>
  );
};
