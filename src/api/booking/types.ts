export interface Booking {
  id: number;
  userId: number;
  roomId: number;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  roomType: {
    capacity: number;
  };
  user: {
    email: string;
    firstName: string;
    id: 5;
    lastName: string;
    phoneNumber: string;
  };
}
