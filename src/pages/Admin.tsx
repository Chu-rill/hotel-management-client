// AdminDashboard.tsx
import React, { useState, useEffect } from "react";
import { useHotel } from "../hooks/useHotel";
import Navbar from "../components/NavBar";
import CreateHotelForm from "../components/CreateHotelForm";
import CreateRoomForm from "../components/CreateRoomForm";
import HotelsList from "../components/HotelsList";
import RoomsList from "../components/RoomsList";
import UsersList from "../components/UsersList";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Hotel } from "../types/index";

const AdminDashboard: React.FC = () => {
  const { getAllHotels } = useHotel();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotelId, setSelectedHotelId] = useState<string>("");
  // const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getAllHotels().then((hotelsData: Hotel[]) => {
      setHotels(hotelsData);
      if (hotelsData.length > 0) {
        setSelectedHotelId(hotelsData[0].id);
      }
    });
  }, []);

  const handleHotelCreated = (newHotel: Hotel) => {
    setHotels([...hotels, newHotel]);
  };

  const handleHotelDeleted = (deletedHotelId: string) => {
    setHotels(hotels.filter((hotel) => hotel.id !== deletedHotelId));

    // If the deleted hotel was the selected one, select another hotel
    if (deletedHotelId === selectedHotelId && hotels.length > 1) {
      const nextHotel = hotels.find((h) => h.id !== deletedHotelId);
      setSelectedHotelId(nextHotel ? nextHotel.id : "");
    }
  };

  // const handleUserSelected = (user: User) => {
  //   setSelectedUser(user);
  //   // You could also switch to a user detail tab or open a modal here
  //   console.log("Selected user:", user);
  // };

  return (
    <div className="p-6 grid gap-6 pt-20">
      <Navbar />
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <Tabs defaultValue="hotels">
        <TabsList className="mb-4">
          <TabsTrigger value="hotels">Hotels</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="createHotel">Create Hotel</TabsTrigger>
          <TabsTrigger value="createRoom">Create Room</TabsTrigger>
        </TabsList>

        <TabsContent value="createHotel">
          <CreateHotelForm onHotelCreated={handleHotelCreated} />
        </TabsContent>

        <TabsContent value="createRoom">
          <CreateRoomForm hotels={hotels} selectedHotelId={selectedHotelId} />
        </TabsContent>

        <TabsContent value="hotels">
          <HotelsList hotels={hotels} onHotelDeleted={handleHotelDeleted} />
        </TabsContent>

        <TabsContent value="rooms">
          <RoomsList
            hotels={hotels}
            selectedHotelId={selectedHotelId}
            onHotelSelected={setSelectedHotelId}
          />
        </TabsContent>

        <TabsContent value="users">
          <UsersList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
