import React from 'react';
import { DesktopGallery } from './desktop-gallery';
import { MobileGallery } from './mobile-gallery';

import { Photo } from '~/api/property/types';

interface Props {
  propertyPhotos: Photo[];
  isLoadig: boolean;
}
export function PropertyGallery({ propertyPhotos, isLoadig }: Props) {
  return (
    <div className=" md:rounded-xl  overflow-hidden ">
      {isLoadig ? (
        <div className="h-[600px] bg-gray-200 animate-pulse"></div>
      ) : (
        propertyPhotos.length > 0 && (
          <>
            <div className="md:block hidden">
              <DesktopGallery propertyPhotos={propertyPhotos} />
            </div>
            <div className="md:hidden block">
              <MobileGallery propertyPhotos={propertyPhotos} />
            </div>
          </>
        )
      )}
    </div>
  );
}
