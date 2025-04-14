export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  _id: string;
  title: string;
  price: number;
  maxPeople: number;
  desc: string;
  roomNumbers: RoomNumber[];
  images: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
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
  } | null;
}
