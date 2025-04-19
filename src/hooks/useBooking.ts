import { useState, useCallback } from "react";
import axios from "./axios";
import { BookingStatus } from "../types";

export interface Booking {
  id: string;
  checkIn: Date;
  checkOut: Date;
  status: BookingStatus;
  userId: string;
  roomId: string;
  hotelId: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
  room?: {
    id: string;
    roomtype?: string;
    roomNumber?: string;
  };
}

interface BookingCreateParams {
  checkIn: Date;
  checkOut: Date;
  status: BookingStatus;
  userId: string;
  roomId: string;
  hotelId: string;
}

interface UseBookingReturnType {
  fetchBookingById: (id: string) => Promise<Booking | null>;
  fetchBookingsByHotelId: (hotelId: string) => Promise<Booking[]>;
  createBooking: (bookingData: BookingCreateParams) => Promise<Booking>;
  updateBooking: (
    id: string,
    bookingData: Partial<Booking>
  ) => Promise<Booking>;
  deleteBooking: (id: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

const useBooking = (): UseBookingReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch a single booking by ID
  const fetchBookingById = useCallback(
    async (id: string): Promise<Booking | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/bookings/${id}`);
        return response.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch booking";
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Fetch all bookings for a specific hotel
  const fetchBookingsByHotelId = useCallback(
    async (hotelId: string): Promise<Booking[]> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/hotels/${hotelId}/bookings`);
        return response.data.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch bookings";
        setError(errorMessage);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Create a new booking
  const createBooking = useCallback(
    async (bookingData: BookingCreateParams): Promise<Booking> => {
      setIsLoading(true);
      setError(null);

      try {
        // Extract hotelId for the URL
        const { hotelId, ...bookingPayload } = bookingData;
        // Create a new object for the API request
        // Converting dates to ISO strings for transmission
        const apiPayload = {
          ...bookingPayload,
          checkIn: bookingData.checkIn.toISOString(),
          checkOut: bookingData.checkOut.toISOString(),
        };

        const response = await axios.post(`/bookings/${hotelId}`, apiPayload);
        return response.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create booking";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Update an existing booking
  const updateBooking = useCallback(
    async (id: string, bookingData: Partial<Booking>): Promise<Booking> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.put(`/bookings/${id}`, bookingData);
        return response.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update booking";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Delete a booking
  const deleteBooking = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.delete(`/bookings/${id}`);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete booking";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    fetchBookingById,
    fetchBookingsByHotelId,
    createBooking,
    updateBooking,
    deleteBooking,
    isLoading,
    error,
  };
};

export default useBooking;
