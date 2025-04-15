import { useState, useCallback } from "react";
import axios from "./axios";
import { Room } from "../types";

interface UseRoomReturnType {
  fetchRoomById: (id: string, hotelId: string) => Promise<Room | null>;
  fetchRoomsByHotelId: (hotelId: string) => Promise<Room[]>;
  createRoom: (roomData: Omit<Room, "id">) => Promise<Room>;
  updateRoom: (id: string, roomData: Partial<Room>) => Promise<Room>;
  deleteRoom: (id: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

const useRoom = (): UseRoomReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch a single room by ID
  const fetchRoomById = useCallback(
    async (id: string, hotelId: string): Promise<Room | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/hotels/${hotelId}/rooms/${id}`);
        return response.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch room";
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Fetch all rooms for a specific hotel
  const fetchRoomsByHotelId = useCallback(
    async (hotelId: string): Promise<Room[]> => {
      setIsLoading(true);
      setError(null);

      try {
        // console.log(`HotelId in hooks: ${hotelId}`);
        const response = await axios.get(`/hotels/${hotelId}/rooms`);
        return response.data.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch rooms";
        setError(errorMessage);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Create a new room
  const createRoom = useCallback(
    async (roomData: Omit<Room, "id">): Promise<Room> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post("/api/rooms", roomData);
        return response.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create room";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Update an existing room
  const updateRoom = useCallback(
    async (id: string, roomData: Partial<Room>): Promise<Room> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.put(`/api/rooms/${id}`, roomData);
        return response.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update room";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Delete a room
  const deleteRoom = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.delete(`/api/rooms/${id}`);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete room";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    fetchRoomById,
    fetchRoomsByHotelId,
    createRoom,
    updateRoom,
    deleteRoom,
    isLoading,
    error,
  };
};

export default useRoom;
