// CreateRoomForm.tsx
import React, { useState, useEffect } from "react";
import useRoom from "../hooks/useRoom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Hotel } from "../types/index";
import { toast } from "sonner";

interface CreateRoomFormProps {
  hotels: Hotel[];
  selectedHotelId: string;
}

type RoomType = "SINGLE" | "DOUBLE" | "SUITE";
type RoomStatus = "AVAILABLE" | "BOOKED" | "MAINTENANCE";

interface NewRoomForm {
  price: number;
  roomNumber: number;
  hotelId: string;
  roomType: RoomType;
  status: RoomStatus;
}

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({
  hotels,
  selectedHotelId,
}) => {
  const { createRoom, isLoading } = useRoom();
  const [newRoom, setNewRoom] = useState<NewRoomForm>({
    price: 0,
    roomNumber: 0,
    hotelId: selectedHotelId,
    roomType: "SINGLE",
    status: "AVAILABLE",
  });

  useEffect(() => {
    if (selectedHotelId) {
      setNewRoom((prev) => ({ ...prev, hotelId: selectedHotelId }));
    }
  }, [selectedHotelId]);

  const handleCreateRoom = async (): Promise<void> => {
    try {
      // console.log("Creating room with data:", newRoom);
      await createRoom(newRoom);
      toast.success("Room Created.");
      // Reset form after successful creation
      setNewRoom({
        price: 0,
        roomNumber: 0,
        hotelId: selectedHotelId,
        roomType: "SINGLE",
        status: "AVAILABLE",
      });
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  const handleHotelChange = (hotelId: string): void => {
    setNewRoom((prev) => ({ ...prev, hotelId: hotelId }));
  };

  return (
    <section className="border p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Create Room</h2>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm">Hotel</label>
            <Select
              value={newRoom.hotelId || ""}
              onValueChange={handleHotelChange}
            >
              <SelectTrigger>
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
          <div>
            <label className="block mb-2 text-sm">Room Number</label>
            <Input
              type="number"
              placeholder="Room Number"
              value={newRoom.roomNumber}
              onChange={(e) =>
                setNewRoom({
                  ...newRoom,
                  roomNumber: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm">Price per Night</label>
            <Input
              type="number"
              placeholder="Price"
              value={newRoom.price}
              onChange={(e) =>
                setNewRoom({
                  ...newRoom,
                  price: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Room Type</label>
            <Select
              value={newRoom.roomType}
              onValueChange={(value: RoomType) =>
                setNewRoom({ ...newRoom, roomType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SINGLE">Single</SelectItem>
                <SelectItem value="DOUBLE">Double</SelectItem>
                <SelectItem value="SUITE">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm">Status</label>
          <Select
            value={newRoom.status}
            onValueChange={(value: RoomStatus) =>
              setNewRoom({ ...newRoom, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AVAILABLE">Available</SelectItem>
              <SelectItem value="BOOKED">Booked</SelectItem>
              <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleCreateRoom} className="mt-2">
          {isLoading ? "Creating..." : "Create Room"}
        </Button>
      </div>
    </section>
  );
};

export default CreateRoomForm;
