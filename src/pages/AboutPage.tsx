import Navbar from "../components/NavBar";
import { Button } from "../components/ui/button";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-hotel-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 bg-hotel-navy dark:text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold font-serif mb-4">
            About InnkeeperPro
          </h1>
          <p className="text-lg">
            Your trusted solution for effortless hotel management — streamline
            bookings, enhance guest experiences, and manage operations with
            ease.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white text-hotel-navy">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4 dark:text-black">
              Why InnkeeperPro?
            </h2>
            <p className="text-gray-700 mb-4">
              InnkeeperPro is a modern hotel management system designed for both
              small inns and large hotel chains. Whether you're managing
              front-desk operations or analyzing revenue trends, our platform
              provides the tools to simplify every task.
            </p>
            <p className="text-gray-700">
              With an intuitive interface and powerful features, InnkeeperPro
              helps hoteliers focus on what matters most: delivering memorable
              guest experiences.
            </p>
          </div>
          <div>
            <img
              src="/images/hotel-dashboard.png"
              alt="Hotel Dashboard"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-hotel-cream">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-hotel-navy mb-10">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Room & Booking Management",
                desc: "Easily manage reservations, availability, and check-ins with real-time updates.",
              },
              {
                title: "Analytics & Reports",
                desc: "Gain insights into occupancy, revenue, and performance trends.",
              },
              {
                title: "User Roles & Staff Control",
                desc: "Assign roles, monitor activities, and streamline staff collaboration.",
              },
              {
                title: "Guest Communication",
                desc: "Send automated messages, updates, and feedback forms to guests.",
              },
              {
                title: "Custom Pricing & Discounts",
                desc: "Set flexible pricing models, seasonal offers, and coupon management.",
              },
              {
                title: "Secure Cloud-Based Access",
                desc: "Access your dashboard anytime, anywhere, with full data protection.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-hotel-navy">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-hotel-navy mb-4">
            Our Vision
          </h2>
          <p className="text-gray-700">
            To revolutionize the hospitality industry by empowering hoteliers
            with cutting-edge, accessible technology that simplifies management
            and enhances guest satisfaction.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-hotel-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <h2 className="text-3xl font-semibold">
            Ready to Elevate Your Hotel?
          </h2>
          <p>
            Join hundreds of hoteliers using InnkeeperPro to run smarter, more
            efficient operations.
          </p>
          <Button className="px-8 py-3 text-lg bg-white text-hotel-navy hover:bg-hotel-gold transition">
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
