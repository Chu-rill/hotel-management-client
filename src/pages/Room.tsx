import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import Navbar from "../components/NavBar";
import useRoom from "../hooks/useRoom";
import useHotel from "../hooks/useHotel";
import useBooking from "../hooks/useBooking";
import { Room, Hotel, BookingStatus } from "../types";

const RoomDetailsPage = () => {
  const { hotelId, id } = useParams();
  const navigate = useNavigate();
  const { fetchRoomById } = useRoom();
  const { fetchHotelById } = useHotel();
  const { createBooking } = useBooking();

  const [room, setRoom] = useState<Room | null>(null);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Booking form state
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [guests, setGuests] = useState<string>("1");
  const [bookingStatus, setBookingStatus] = useState<string>("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        if (!hotelId || !id) {
          throw new Error("Missing hotel ID or room ID");
        }

        // Fetch room details
        const roomData = await fetchRoomById(id, hotelId);
        if (!roomData) {
          throw new Error("Room not found");
        }
        setRoom(roomData);

        // Also fetch hotel details for context
        const hotelData = await fetchHotelById(hotelId);
        if (!hotelData) {
          throw new Error("Hotel not found");
        }
        setHotel(hotelData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [hotelId, id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!room || !hotel || !checkInDate || !checkOutDate) {
        setBookingStatus("Please select both check-in and check-out dates");
        return;
      }

      // In a real application, you would get the customerId from authentication
      const customerId = 1; // Placeholder

      const bookingData = {
        checkIn: new Date(checkInDate),
        checkOut: new Date(checkOutDate),
        status: "VALID" as unknown as BookingStatus,
        customerId,
        roomId: room.id,
        hotelId: hotel.id,
      };

      await createBooking(bookingData);
      setBookingStatus("Booking successful!");

      // Clear form
      setCheckInDate("");
      setCheckOutDate("");
      setGuests("1");
    } catch (err) {
      setBookingStatus("Booking failed. Please try again.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-hotel-cream">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="text-2xl">Loading room details...</div>
        </div>
      </div>
    );
  }

  if (error || !room || !hotel) {
    return (
      <div className="min-h-screen bg-hotel-cream">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="text-2xl text-red-600">
            {error || "Room not found"}
          </div>
          <Button onClick={handleGoBack} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // console.log("Room Details:", room);

  return (
    <div className="min-h-screen bg-hotel-cream">
      <Navbar />

      {/* Header Section */}
      <div className="bg-hotel-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="mb-4 text-white border-white hover:bg-white hover:text-hotel-navy"
          >
            ← Back to Rooms
          </Button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif">
                {room.roomtype} - Room {room.roomNumber}
              </h1>
              <p className="text-lg mt-2">{hotel.name}</p>
            </div>
            <div className="mt-4 md:mt-0">
              {/* <Badge variant="outline" className="text-lg border-white text-white px-3 py-1">
                Capacity: {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
              </Badge> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                {/* Main Image */}
                <div className="bg-gray-100 rounded-lg overflow-hidden h-80 mb-4">
                  {room.images ? (
                    <img
                      src={room.images[0]}
                      alt={`${room.roomtype} - ${room.roomNumber}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <p className="text-gray-500">No image available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Room Description and Details */}
            <Card className="shadow-lg mt-6">
              <CardHeader>
                <CardTitle>About this Room</CardTitle>
              </CardHeader>
              <CardContent>
                {/* <p className="text-gray-700 leading-relaxed mb-6">
                  {room.description || "No description available."}
                </p> */}

                <Tabs defaultValue="amenities">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="details">Room Details</TabsTrigger>
                  </TabsList>
                  <TabsContent value="amenities" className="mt-4">
                    <h3 className="text-xl font-medium mb-4">Room Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {room.amenity && room.amenity.length > 0 ? (
                        room.amenity.map((amenity, index) => (
                          <Badge
                            key={index}
                            className="px-3 py-1 bg-hotel-navy"
                          >
                            {amenity}
                          </Badge>
                        ))
                      ) : (
                        <p>No amenities listed</p>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="mt-4">
                    <h3 className="text-xl font-medium mb-4">Room Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Room Type:</span>
                        <span>{room.roomtype}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Room Number:</span>
                        <span>{room.roomNumber}</span>
                      </div>
                      {/* <div className="flex items-center gap-2">
                        <span className="font-medium">Capacity:</span>
                        <span>{room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}</span>
                      </div> */}
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Status:</span>
                        <Badge
                          className={
                            room.status === "AVAILABLE"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }
                        >
                          {room.status}
                        </Badge>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div>
            <Card className="shadow-lg sticky top-6">
              <CardHeader>
                <CardTitle>Book This Room</CardTitle>
                <CardDescription>
                  Best price guarantee when booking directly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-semibold">
                  ₦{room.price}
                  <span className="text-lg font-normal text-gray-500 ml-2">
                    per night
                  </span>
                </div>

                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      min={new Date().toISOString().split("T")[0]}
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      min={
                        checkInDate || new Date().toISOString().split("T")[0]
                      }
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Guests
                    </label>
                    {/* <select 
                      className="w-full p-2 border rounded"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                    >
                      {[...Array(room.capacity)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select> */}
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full h-12"
                      disabled={room.status !== "AVAILABLE"}
                    >
                      {room.status === "AVAILABLE"
                        ? "Book Now"
                        : "Room Unavailable"}
                    </Button>
                  </div>

                  {bookingStatus && (
                    <div
                      className={`text-sm text-center mt-2 ${
                        bookingStatus.includes("failed")
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {bookingStatus}
                    </div>
                  )}

                  <div className="text-sm text-gray-500 text-center mt-2">
                    No payment required to book
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-hotel-navy text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 InnkeeperPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RoomDetailsPage;
