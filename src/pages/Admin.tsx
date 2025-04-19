import React, { useEffect, useState } from "react";
import useRoom from "../hooks/useRoom";
import { useHotel } from "../hooks/useHotel";
import { Room, Hotel, User } from "../types/index";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import Navbar from "../components/NavBar";

const AdminDashboard = () => {
  const { fetchRoomsByHotelId, createRoom, updateRoom, deleteRoom } = useRoom();
  const {
    getAllHotels,
    createHotel,
    updateHotel,
    deleteHotel,
    addImageToHotel,
  } = useHotel();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [newRoom, setNewRoom] = useState({
    price: 0,
    roomNumber: 0,
    hotel: null as any,
    roomtype: "SINGLE", // Default value
    status: "AVAILABLE", // Default value
  });
  const [newHotel, setNewHotel] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    email: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<string>("");
  const [viewHotelId, setViewHotelId] = useState<string>("");

  useEffect(() => {
    getAllHotels().then((hotels: any) => {
      setHotels(hotels);
      if (hotels.length > 0) {
        const firstHotelId = hotels[0].id;
        setSelectedHotelId(firstHotelId);
        setViewHotelId(firstHotelId);
        setNewRoom((prev) => ({ ...prev, hotel: { id: firstHotelId } }));
        fetchRoomsByHotelId(firstHotelId).then(setRooms);
      }
    });
  }, []);

  const handleCreateRoom = async () => {
    try {
      const room = await createRoom(newRoom);
      setRooms([...rooms, room]);
      // Reset form after successful creation
      setNewRoom({
        price: 0,
        roomNumber: 0,
        hotel: { id: selectedHotelId }, // Keep the selected hotel
        roomtype: "SINGLE",
        status: "AVAILABLE",
      });
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  const handleCreateHotel = async () => {
    try {
      const hotel = await createHotel(newHotel);
      setHotels([...hotels, hotel]);
      setNewHotel({
        name: "",
        address: "",
        city: "",
        country: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error("Failed to create hotel:", error);
    }
  };

  const handleDeleteRoom = async (id: string) => {
    await deleteRoom(id);
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const handleDeleteHotel = async (id: string) => {
    await deleteHotel(id);
    setHotels(hotels.filter((hotel) => hotel.id !== id));

    // If the deleted hotel was the selected one, select the first available hotel
    if (id === viewHotelId && hotels.length > 1) {
      const nextHotel = hotels.find((h) => h.id !== id) || hotels[0];
      setViewHotelId(nextHotel.id);
      fetchRoomsByHotelId(nextHotel.id).then(setRooms);
    }
  };

  const handleAddImage = async (roomId: string) => {
    if (image) {
      await addImageToHotel(roomId, image);
      setImage(null);
    }
  };

  const handleHotelChange = (hotelId: string) => {
    setSelectedHotelId(hotelId);
    setNewRoom((prev) => ({ ...prev, hotel: { id: hotelId } }));
  };

  const handleViewHotelChange = (hotelId: string) => {
    setViewHotelId(hotelId);
    fetchRoomsByHotelId(hotelId).then(setRooms);
  };

  const selectedHotel = hotels.find((hotel) => hotel.id === viewHotelId);

  return (
    <div className="p-6 grid gap-6 pt-20">
      {/* Navbar */}
      <Navbar />
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <section className="border p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Create Hotel</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Hotel name"
              value={newHotel.name}
              onChange={(e) =>
                setNewHotel({ ...newHotel, name: e.target.value })
              }
            />
            <Input
              placeholder="Address"
              value={newHotel.address}
              onChange={(e) =>
                setNewHotel({ ...newHotel, address: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="City"
              value={newHotel.city}
              onChange={(e) =>
                setNewHotel({ ...newHotel, city: e.target.value })
              }
            />
            <Input
              placeholder="Country"
              value={newHotel.country}
              onChange={(e) =>
                setNewHotel({ ...newHotel, country: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Phone Number"
              value={newHotel.phone}
              onChange={(e) =>
                setNewHotel({ ...newHotel, phone: e.target.value })
              }
            />
            <Input
              placeholder="Email Address"
              type="email"
              value={newHotel.email}
              onChange={(e) =>
                setNewHotel({ ...newHotel, email: e.target.value })
              }
            />
          </div>

          <Button onClick={handleCreateHotel}>Create Hotel</Button>
        </div>
      </section>

      <section className="border p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Create Room</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm">Hotel</label>
              <Select value={selectedHotelId} onValueChange={handleHotelChange}>
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
                value={newRoom.roomtype}
                onValueChange={(value) =>
                  setNewRoom({ ...newRoom, roomtype: value })
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
              onValueChange={(value) =>
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
            Create Room
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="h-full">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{hotel.name}</h3>
                <p className="text-gray-600 mb-1">
                  {hotel.address || hotel.address}
                </p>
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
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Rooms</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm">Viewing rooms for:</span>
            <Select value={viewHotelId} onValueChange={handleViewHotelChange}>
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
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className="text-sm"
                      />
                      <Button
                        onClick={() => handleAddImage(room.id)}
                        size="sm"
                        className="w-full"
                      >
                        Upload Image
                      </Button>
                    </div>

                    <Button
                      onClick={() => handleDeleteRoom(room.id)}
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
    </div>
  );
};

export default AdminDashboard;
