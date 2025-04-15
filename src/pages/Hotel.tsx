import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import useHotel from "../hooks/useHotel";
import useRoom from "../hooks/useRoom";
import { Hotel, Room } from "../types";

const HotelDetailsPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const { fetchHotelById } = useHotel();
  const { fetchRoomsByHotelId } = useRoom();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch hotel details
        const hotelData = await fetchHotelById(hotelId);
        setHotel(hotelData);
        if (hotelData?.imageUrl) {
          setSelectedImage(hotelData.imageUrl);
        }

        // Fetch rooms for this hotel
        if (hotelId) {
          const roomsData = await fetchRoomsByHotelId(hotelId);
          setRooms(roomsData);
        }
      } catch (err) {
        setError("Failed to load hotel details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) {
      fetchData();
    }
  }, [hotelId]);

  const renderRatingStars = (rating: number) => {
    if (!rating) return null;

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-xl">
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "½" : "☆"}
          </span>
        ))}
        <span className="ml-2 text-gray-700">({rating})</span>
      </div>
    );
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleViewRoom = (roomId: string) => {
    navigate(`/rooms/${roomId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-hotel-cream">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="text-2xl">Loading hotel details...</div>
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-hotel-cream">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="text-2xl text-red-600">
            {error || "Hotel not found"}
          </div>
          <Button onClick={handleGoBack} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Create a full address from available fields
  const fullAddress = [hotel.address, hotel.city, hotel.country]
    .filter(Boolean)
    .join(", ");

  console.log({ hotel, rooms });

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
            ← Back to Hotels
          </Button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif">{hotel.name}</h1>
              <p className="text-lg mt-2">{fullAddress}</p>
            </div>
            <div className="mt-4 md:mt-0">
              {renderRatingStars(hotel.rating)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Gallery & Hotel Details */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                {/* Main Image */}
                <div className="bg-gray-100 rounded-lg overflow-hidden h-80 mb-4">
                  {hotel.imageUrl ? (
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
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

            {/* Hotel Description and Details */}
            <Card className="shadow-lg mt-6">
              <CardHeader>
                <CardTitle>About {hotel.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {hotel.description || "No description available."}
                </p>

                <Tabs defaultValue="contact">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>
                  <TabsContent value="contact" className="mt-4">
                    <h3 className="text-xl font-medium mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-2">
                      {hotel.phone && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Phone:</span>
                          <span>{hotel.phone}</span>
                        </div>
                      )}
                      {hotel.email && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Email:</span>
                          <span>{hotel.email}</span>
                        </div>
                      )}
                      {hotel.address && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Address:</span>
                          <span>{fullAddress}</span>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="location" className="mt-4">
                    <h3 className="text-xl font-medium mb-4">Location</h3>
                    <p className="mb-4">{fullAddress}</p>
                    <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                      <p className="text-gray-600">
                        Map view would be displayed here
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Available Rooms Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-serif mb-6">Available Rooms</h2>

              {rooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rooms.map((room) => (
                    <Card
                      key={room.id}
                      className="shadow-lg transition-transform hover:scale-105"
                    >
                      <div className="h-48 bg-gray-200 overflow-hidden">
                        {room.images && room.images.length > 0 ? (
                          <img
                            src={room.images[0]}
                            alt={`Room ${room.roomNumber}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <p className="text-gray-500">No image available</p>
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>Room {room.roomNumber}</CardTitle>
                          <Badge
                            variant={
                              room.status === "available"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {room.status}
                          </Badge>
                        </div>
                        <CardDescription>{room.roomtype}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-2xl font-semibold">
                          ₦{room.price}
                          <span className="text-sm font-normal text-gray-500 ml-1">
                            per night
                          </span>
                        </div>

                        {room.amenity && room.amenity.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {room.amenity.slice(0, 3).map((amenity, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-gray-100"
                              >
                                {amenity}
                              </Badge>
                            ))}
                            {room.amenity.length > 3 && (
                              <Badge variant="outline" className="bg-gray-100">
                                +{room.amenity.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="cursor-pointer">
                        <Button
                          onClick={() => handleViewRoom(room.id)}
                          className="w-full "
                          disabled={room.status !== "available"}
                        >
                          {room.status === "AVAILABLE"
                            ? "View Details"
                            : "Not Available"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    No rooms available at this time.
                  </p>
                </div>
              )}
            </div>
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

export default HotelDetailsPage;
