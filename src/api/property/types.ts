export interface City {
  id: number;
  name: string;
  slug: string;
}
export type Cities = City[];

export type GetCitiesResponse = Cities;

export interface Service {
  id: number;
  name: string;
  slug: string;
}

export type PropertyServices = {
  service: Service;
}[];

export interface Property {
  id?: number;
  name: string;
  address: string;
  cityId: number;
  postalCode: string;
  description: string;
  contactName: string;
  contactPhone: string;
  propertyType: string;
  rating?: number;
  treatments?: number[];
  services?: number[];
  status?: string;
  roomTypes: RoomType[];
  propertyPhotos?: PropertyPhoto[];
  minPricePerDay?: number;
}
export interface RoomType {
  pricePerDay: number;
}

export interface PropertyPhoto extends Photo {}

export interface Photo {
  photo: { id: number; url: string };
}
export type OwnerProperties = OwnerProperty[];

export interface OwnerProperty extends Omit<Property, 'services'> {
  id: number;
  ownerId: number;
  status: string;
  owner: Owner;
  propertyServices: PropertyServices;
  propertyPhotos: PropertyPhoto[];
}

export interface Owner {
  id: number;
  email: string;
  password: string;
  firstName: any;
  lastName: any;
  phoneNumber: any;
  isActivated: boolean;
}

export interface PropertyRequest extends Partial<Property> {}
export interface GetPropertyResponse extends OwnerProperty {}

export type EditPropertyRequest = Partial<Property>;

export interface ProperyResponse {
  propertyId: number;
}

export type GetServicesResponse = Service[];
export type GetFacilitiesResponse = Service[];
export type RoomFacili = {
  service: Service;
}[];
