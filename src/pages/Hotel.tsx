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
import useHotel from "../hooks/useHotel";
import { string } from "zod";
import { Hotel } from "../types";

const HotelDetailsPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const { fetchHotelById } = useHotel();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // We'll use hotel.imageUrl as the selected image since we don't have an array of images
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const hotelData = await fetchHotelById(hotelId);
        setHotel(hotelData);
        if (hotelData?.imageUrl) {
          setSelectedImage(hotelData.imageUrl);
        }
      } catch (err) {
        setError("Failed to load hotel details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) {
      fetchHotelDetails();
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
          {/* Left Column - Gallery */}
          <div className="lg:col-span-2">
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
          </div>

          {/* Right Column - Booking Card */}
          <div>
            <Card className="shadow-lg sticky top-6">
              <CardHeader>
                <CardTitle>Book Your Stay</CardTitle>
                <CardDescription>
                  Best price guarantee when booking directly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-semibold">
                  $$$
                  <span className="text-lg font-normal text-gray-500 ml-2">
                    per night
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Guests
                    </label>
                    <select className="w-full p-2 border rounded">
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Guests</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full h-12">Check Availability</Button>
                </div>

                <div className="text-sm text-gray-500 text-center mt-2">
                  No payment required to book
                </div>
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

export default HotelDetailsPage;
