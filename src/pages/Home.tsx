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

const HomePage = () => {
  const navigate = useNavigate();

  const handleBookRoom = () => {
    navigate("/booking"); // Example route to the booking page
  };

  return (
    <div className="min-h-screen bg-hotel-cream">
      {/* Hero Section */}
      <div className="flex items-center justify-center bg-hotel-navy text-white py-20">
        <Card className="max-w-4xl w-full p-6 shadow-xl bg-transparent">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-serif">
              Welcome to Our Hotel
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-xl">
              Your perfect getaway awaits! Explore rooms and book your stay
              today.
            </p>
            <Button onClick={handleBookRoom} className="w-full max-w-sm">
              Book a Room
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Room Selection Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <h2 className="text-3xl font-semibold text-hotel-navy">
            Available Rooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Room 1 */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Deluxe Suite</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  A spacious suite with a beautiful ocean view. Perfect for a
                  romantic getaway.
                </p>
                <Button className="mt-4 w-full" onClick={handleBookRoom}>
                  Book Now
                </Button>
              </CardContent>
            </Card>
            {/* Room 2 */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Standard Room</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  A cozy room with all the essential amenities for a comfortable
                  stay.
                </p>
                <Button className="mt-4 w-full" onClick={handleBookRoom}>
                  Book Now
                </Button>
              </CardContent>
            </Card>
            {/* Room 3 */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Family Suite</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  A spacious room designed for families, with extra amenities
                  for comfort.
                </p>
                <Button className="mt-4 w-full" onClick={handleBookRoom}>
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="py-12 bg-hotel-cream">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h3 className="text-2xl font-semibold text-hotel-navy">
            Search for Rooms
          </h3>
          <div className="flex justify-center space-x-4">
            <Input placeholder="Enter your location" className="w-80" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Room Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deluxe">Deluxe Suite</SelectItem>
                <SelectItem value="standard">Standard Room</SelectItem>
                <SelectItem value="family">Family Suite</SelectItem>
              </SelectContent>
            </Select>
            <Button className="h-10" onClick={handleBookRoom}>
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-hotel-navy text-white py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 Hotel Management. All rights reserved.</p>
          <p className="text-sm">Designed by Your Company</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
