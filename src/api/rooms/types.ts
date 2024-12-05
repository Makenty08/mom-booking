export type getRoomTypesResponse = Roomtype[];

export type getRoomTypesRequest = {
  propertyId: string;
};
interface Room {
  id: number;
  name: string;
  description: string;
  surfaceArea: number;
  pricePerDay: number;
  propertyId: number;
  capacity: number;
  quantity: number;
}

export interface Roomtype extends Room {
  roomTypeFacilities: RoomTypeFacility[];
  roomTypePhotos: RoomPhoto[];
}

export interface RoomPhoto {
  photoId: number;
}
export interface RoomTypeFacility {
  facility: Facility;
}

export interface Facility {
  id: number;
  name: string;
  slug: string;
}

interface EditRoomType extends Room {
  facilityIds: number[];
}

export interface EditRoomTypeRequest extends Partial<EditRoomType> {}
