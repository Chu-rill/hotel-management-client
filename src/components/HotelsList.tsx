// HotelsList.tsx
import React from "react";
import { useHotel } from "../hooks/useHotel";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Hotel } from "../types/index";

interface HotelsListProps {
  hotels: Hotel[];
  onHotelDeleted: (id: string) => void;
}

const HotelsList: React.FC<HotelsListProps> = ({ hotels, onHotelDeleted }) => {
  const { deleteHotel } = useHotel();

  const handleDeleteHotel = async (id: string): Promise<void> => {
    try {
      await deleteHotel(id);
      onHotelDeleted(id);
    } catch (error) {
      console.error("Failed to delete hotel:", error);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Hotels</h2>
      {hotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="h-full">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{hotel.name}</h3>
                <p className="text-gray-600 mb-1">{hotel.address}</p>
                <p className="text-gray-600 mb-1">
                  {hotel.city}, {hotel.country}
                </p>
                <p className="text-gray-600 mb-1">Phone: {hotel.phone}</p>
                <p className="text-gray-600 mb-3">Email: {hotel.email}</p>

                <div className="space-y-3">
                  <Button
                    onClick={() => handleDeleteHotel(hotel.id)}
                    className="bg-red-500 w-full"
                    size="sm"
                  >
                    Delete Hotel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          No hotels found. Create a hotel to get started.
        </div>
      )}
    </section>
  );
};

export default HotelsList;
