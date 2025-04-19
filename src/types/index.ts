export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: string;
  roomNumber: number;
  roomtype: string;
  price: number;
  status: string;
  hotel: any; // You might want to define a more specific Hotel type
  amenity?: any[]; // You might want to define a more specific Amenity type
  images?: string[];
}
export interface RoomNumber {
  _id: string;
  number: number;
  unavailableDates: Date[];
}

export interface Booking {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  roomId: string;
  roomTitle: string;
  roomNumber: number;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface BookingData {
  roomId: string;
  roomNumber: number;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
}

export interface SignupResponse {
  statusCode: number;
  message: string;
  data: {
    id: string;
    username: string;
    email: string;
    phone?: string;
    role: string;
  };
}

export interface Hotel {
  id: string;
  name: string;
  address: string;
  description: string;
  city: string;
  country: string;
  rating: number;
  phone: string;
  email: string;
  priceRange?: string;
  imageUrl: string;
  amenities?: string[];
}

export enum BookingStatus {
  VALID = "VALID",
  CANCELLED = "CANCELLED",
}
export type RoomType = "SINGLE" | "DOUBLE" | "SUITE";
export type RoomStatus = "AVAILABLE" | "BOOKED" | "MAINTENANCE";
