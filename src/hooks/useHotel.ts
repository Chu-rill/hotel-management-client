import { useState, useEffect } from "react";
import axios from "./axios";
import { Hotel } from "../types";

export interface UseHotelReturn {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
  fetchHotels: () => Promise<void>;
  fetchHotelById: (id: string | undefined) => Promise<Hotel | null>;
  //   searchHotels: (query: string, priceRange?: string) => Promise<void>;
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

  //   const searchHotels = async (
  //     query: string,
  //     priceRange?: string
  //   ): Promise<void> => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       const response = await axios.get(`${API_URL}/hotels/search`, {
  //         params: { query, priceRange },
  //       });
  //       setHotels(response.data.data || []);
  //     } catch (err) {
  //       console.error("Error searching hotels:", err);
  //       setError("Failed to search hotels. Please try again later.");

  //       // Filter demo data if API fails
  //       const filteredHotels = demoHotels.filter(
  //         (hotel) =>
  //           hotel.location.toLowerCase().includes(query.toLowerCase()) ||
  //           hotel.name.toLowerCase().includes(query.toLowerCase()) ||
  //           (priceRange && hotel.priceRange === priceRange)
  //       );
  //       setHotels(filteredHotels);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // Fetch hotels on component mount
  useEffect(() => {
    fetchHotels();
  }, []);

  return {
    hotels,
    loading,
    error,
    fetchHotels,
    fetchHotelById,
    // searchHotels,
  };
};

export default useHotel;
