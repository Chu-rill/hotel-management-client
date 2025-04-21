import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import Navbar from "../components/NavBar";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import useHotel from "../hooks/useHotel";

const HomePage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [userData] = useState(authUser);
  const { loading, hotels, error } = useHotel();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // Fixed the parameter bug: it should be hotelId, not hotels
  const handleViewHotel = (hotelId: string) => {
    navigate(`/hotel/${hotelId}`);
  };

  // Function to render stars based on rating
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "½" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-hotel-cream pt-20">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex items-center justify-center bg-hotel-navy text-white py-20">
        <Card className="max-w-4xl w-full p-6 shadow-xl bg-transparent">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-serif">
              Welcome to InnkeeperPro
              {userData?.userName && (
                <p className="text-2xl mt-2">Hello, {userData.userName}</p>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-xl">
              Discover the perfect hotel for your next journey. Browse our
              curated collection of properties.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h3 className="text-2xl font-semibold  text-black">
            Find Your Perfect Hotel
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Input
              placeholder="Enter destination"
              className="w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-80">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget ($)</SelectItem>
                <SelectItem value="moderate">Moderate ($$)</SelectItem>
                <SelectItem value="luxury">Luxury ($$$)</SelectItem>
                <SelectItem value="ultraluxury">Ultra Luxury ($$$$)</SelectItem>
              </SelectContent>
            </Select>
            <Button className="h-10 px-8">Search</Button>
          </div>
        </div>
      </div>

      {/* Hotels Listing Section */}
      <div className="py-12 bg-hotel-cream">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl font-semibold text-hotel-navy">
            Featured Hotels
          </h2>

          {error && (
            <div className="text-center py-4 text-red-600">{error}</div>
          )}

          {loading ? (
            <div className="text-center py-12">Loading available hotels...</div>
          ) : hotels.length === 0 ? (
            <div className="text-center py-12">No hotels found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <Card
                  key={hotel.id}
                  className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader>
                    {hotel.imageUrl && (
                      <div className="h-40 bg-gray-200 rounded-t-lg overflow-hidden mb-2">
                        <img
                          src={hotel.imageUrl}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardTitle className="text-xl text-hotel-navy">
                      {hotel.name}
                    </CardTitle>
                    <div className="flex justify-between items-center text-sm">
                      <span>{hotel.address}</span>
                      <div className="flex items-center space-x-1">
                        {renderRatingStars(hotel.rating)}
                        <span className="ml-1">({hotel.rating})</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="dark:text-white text-black ">
                      {hotel.description}
                    </p>
                    {hotel.amenities && (
                      <div className="mt-4">
                        <p className="font-medium mb-1">Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.slice(0, 3).map((amenity, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              {amenity}
                            </span>
                          ))}
                          {hotel.amenities.length > 3 && (
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              +{hotel.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{hotel.priceRange}</span>
                      <Button onClick={() => handleViewHotel(hotel.id)}>
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-hotel-navy text-white py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 InnkeeperPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
