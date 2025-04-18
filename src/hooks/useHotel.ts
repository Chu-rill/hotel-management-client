import { useState, useEffect } from "react";
import axios from "./axios";
import { Hotel } from "../types";

export interface UseHotelReturn {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
  fetchHotels: () => Promise<void>;
  fetchHotelById: (id: string | undefined) => Promise<Hotel | null>;
  getAllHotels: () => Promise<Hotel[]>;
  createHotel: (hotelData: Partial<Hotel>) => Promise<Hotel>;
  updateHotel: (id: string, hotelData: Partial<Hotel>) => Promise<Hotel>;
  deleteHotel: (id: string) => Promise<void>;
  addImageToHotel: (id: string, image: File) => Promise<void>;
}

export const useHotel = (): UseHotelReturn => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHotels = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("/hotels");
      setHotels(response.data.data || []);
    } catch (err) {
      console.error("Error fetching hotels:", err);
      setError("Failed to fetch hotels. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHotelById = async (
    id: string | undefined
  ): Promise<Hotel | null> => {
    try {
      setLoading(true);
      const response = await axios.get(`/hotels/${id}`);
      return response.data.data;
    } catch (err) {
      console.error(`Error fetching hotel with ID ${id}:`, err);
      setError(`Failed to fetch hotel details. Please try again later.`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAllHotels = async (): Promise<Hotel[]> => {
    try {
      const response = await axios.get("/hotels");
      return response.data.data || [];
    } catch (err) {
      console.error("Error fetching all hotels:", err);
      throw new Error("Failed to fetch hotels.");
    }
  };

  const createHotel = async (hotelData: Partial<Hotel>): Promise<Hotel> => {
    try {
      const response = await axios.post("/admin/hotels", hotelData);
      return response.data.data;
    } catch (err) {
      console.error("Error creating hotel:", err);
      throw new Error("Failed to create hotel.");
    }
  };

  const updateHotel = async (
    id: string,
    hotelData: Partial<Hotel>
  ): Promise<Hotel> => {
    try {
      const response = await axios.put(`/admin/hotels/${id}`, hotelData);
      return response.data.data;
    } catch (err) {
      console.error(`Error updating hotel with ID ${id}:`, err);
      throw new Error("Failed to update hotel.");
    }
  };

  const deleteHotel = async (id: string): Promise<void> => {
    try {
      await axios.delete(`/admin/hotels/${id}`);
    } catch (err) {
      console.error(`Error deleting hotel with ID ${id}:`, err);
      throw new Error("Failed to delete hotel.");
    }
  };

  const addImageToHotel = async (id: string, image: File): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      await axios.post(`/hotels/${id}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.error(`Error adding image to hotel with ID ${id}:`, err);
      throw new Error("Failed to add image to hotel.");
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return {
    hotels,
    loading,
    error,
    fetchHotels,
    fetchHotelById,
    getAllHotels,
    createHotel,
    updateHotel,
    deleteHotel,
    addImageToHotel,
  };
};

export default useHotel;
