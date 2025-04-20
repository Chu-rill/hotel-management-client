// RoomsList.tsx
import React, { useState, useEffect } from "react";
import useRoom from "../hooks/useRoom";
// import { useHotel } from "../hooks/useHotel";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Hotel, Room } from "../types/index";
import { toast } from "sonner";

interface RoomsListProps {
  hotels: Hotel[];
  selectedHotelId: string;
  onHotelSelected: (id: string) => void;
}

const RoomsList: React.FC<RoomsListProps> = ({
  hotels,
  selectedHotelId,
  onHotelSelected,
}) => {
  const { fetchRoomsByHotelId, deleteRoom, addImageToRoom } = useRoom();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (selectedHotelId) {
      fetchRoomsByHotelId(selectedHotelId).then((fetchedRooms: Room[]) => {
        setRooms(fetchedRooms);
      });
    }
  }, [selectedHotelId, fetchRoomsByHotelId]);

  const handleViewHotelChange = (hotelId: string): void => {
    onHotelSelected(hotelId);
  };

  const handleDeleteRoom = async (
    id: string,
    hotelId: string
  ): Promise<void> => {
    try {
      await deleteRoom(id, hotelId);
      toast.success("Room Deleted!");
      setRooms(rooms.filter((room) => room.id !== id));
    } catch (error) {
      console.error("Failed to delete room:", error);
    }
  };

  const handleAddImage = async (roomId: string): Promise<void> => {
    if (image && selectedHotelId) {
      try {
        await addImageToRoom(selectedHotelId, roomId, [image]);
        toast.success("Image Uploaded!");
        setImage(null);
      } catch (error) {
        console.error("Failed to add image:", error);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const selectedHotel = hotels.find((hotel) => hotel.id === selectedHotelId);

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Rooms</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm">Viewing rooms for:</span>
          <Select value={selectedHotelId} onValueChange={handleViewHotelChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a hotel" />
            </SelectTrigger>
            <SelectContent>
              {hotels.map((hotel) => (
                <SelectItem key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedHotel && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md">
          <h3 className="font-medium">Hotel: {selectedHotel.name}</h3>
          <p className="text-sm text-gray-600">
            Address: {selectedHotel.address}
          </p>
          <p className="text-sm text-gray-600">
            Location: {selectedHotel.city}, {selectedHotel.country}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <Card key={room.id} className="h-full">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-lg">
                      Room #{room.roomNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                      Type: {room.roomtype}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: ${room.price}/night
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: {room.status}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2 mt-3">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="text-sm"
                    />
                    <Button
                      onClick={() => handleAddImage(room.id)}
                      size="sm"
                      className="w-full cursor-pointer hover:bg-blue-600"
                    >
                      Upload Image
                    </Button>
                  </div>

                  <Button
                    onClick={() => handleDeleteRoom(room.id, selectedHotelId)}
                    className="bg-red-500 w-full mt-2"
                    size="sm"
                  >
                    Delete Room
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-gray-500">
            No rooms found for this hotel. Create a room to get started.
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomsList;
