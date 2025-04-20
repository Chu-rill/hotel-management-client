import { useState, useCallback } from "react";
import axios from "./axios";
import { CreateRoomDto, Room } from "../types";

interface UseRoomReturnType {
  fetchRoomById: (id: string, hotelId: string) => Promise<Room | null>;
  fetchRoomsByHotelId: (hotelId: string) => Promise<Room[]>;
  createRoom: (roomData: CreateRoomDto) => Promise<Room>;
  updateRoom: (id: string, roomData: Partial<Room>) => Promise<Room>;
  deleteRoom: (id: string, hotelId: string) => Promise<boolean>;
  addImageToRoom: (
    hotelId: string,
    roomId: string,
    files: File[]
  ) => Promise<Room | null>;
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
        return response.data.data;
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
    async (roomData: CreateRoomDto): Promise<Room> => {
      setIsLoading(true);
      setError(null);

      try {
        const { hotelId, ...roomDataPayload } = roomData;
        const response = await axios.post(
          `/admin/hotels/${hotelId}/rooms`,
          roomDataPayload
        );
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
  const deleteRoom = useCallback(
    async (id: string, hotelId: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        await axios.delete(`/admin/hotels/${hotelId}/rooms/${id}`);
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete room";
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Add image to room
  const addImageToRoom = useCallback(
    async (
      hotelId: string,
      roomId: string,
      files: File[]
    ): Promise<Room | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const formData = new FormData();
        // ADD THE FILE SIZE CHECK HERE, BEFORE CREATING THE FORMDATA
        files.forEach((file) => {
          // Check if file size exceeds 5MB (adjust as needed)
          if (file.size > 5 * 1024 * 1024) {
            throw new Error(
              `File ${file.name} exceeds the maximum size limit (5MB)`
            );
          }
        });
        files.forEach((file) => {
          formData.append("files", file);
        });

        const response = await axios.post(
          `/admin/hotels/${hotelId}/rooms/${roomId}/images`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            timeout: 60000,
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) /
                  (progressEvent.total ?? progressEvent.loaded)
              );
              // You can update state here to show progress
              console.log(`Upload progress: ${percentCompleted}%`);
            },
          }
        );
        return response.data.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to add image to room";
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    fetchRoomById,
    fetchRoomsByHotelId,
    createRoom,
    updateRoom,
    deleteRoom,
    addImageToRoom,
    isLoading,
    error,
  };
};

export default useRoom;
