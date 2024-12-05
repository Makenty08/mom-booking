export interface PropertyCreate {
  id: number;
  name: string;
  address: string;
  cityId: number;
  postalCode: string;
  description: string;
  ownerId: number;
  propertyType: string;
  rating: number;
  contactName: string;
  contactPhone: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  roomTypes: RoomType[];
  propertyServices: PropertyService[];
  propertyTreatments: any[];
  propertyPhotos: PropertyPhoto[];
  city: City;
  owner: Owner;
  minPricePerDay: number;
}

export interface RoomType {
  id: number;
  name: string;
  description: string;
  surfaceArea: number;
  pricePerDay: number;
  propertyId: number;
  capacity: number;
  roomTypePhotos: RoomTypePhoto[];
}

export interface RoomTypePhoto {
  id: number;
  roomTypeId: number;
  photoId: number;
  photo: Photo;
}

export interface Photo {
  id: number;
  url: string;
}

export interface PropertyService {
  service: Service;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
}

export interface PropertyPhoto {
  photo: Photo2;
}

export interface Photo2 {
  id: number;
}

export interface City {
  id: number;
  name: string;
  slug: string;
}

export interface Owner {
  firstName: any;
  lastName: any;
  email: string;
}
