// CreateHotelForm.tsx
import React, { useState } from "react";
import { useHotel } from "../hooks/useHotel";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Hotel } from "../types/index";
import { toast } from "sonner";

interface CreateHotelFormProps {
  onHotelCreated: (hotel: Hotel) => void;
}

interface NewHotelForm {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
}

const CreateHotelForm: React.FC<CreateHotelFormProps> = ({
  onHotelCreated,
}) => {
  const { createHotel } = useHotel();
  const [newHotel, setNewHotel] = useState<NewHotelForm>({
    name: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    email: "",
  });

  const handleCreateHotel = async (): Promise<void> => {
    try {
      const hotel = await createHotel(newHotel);
      onHotelCreated(hotel);
      toast.success("Hotel Created.");
      // Reset form after successful creation
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

  return (
    <section className="border p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Create Hotel</h2>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Hotel name"
            value={newHotel.name}
            onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
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
            onChange={(e) => setNewHotel({ ...newHotel, city: e.target.value })}
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
  );
};

export default CreateHotelForm;
