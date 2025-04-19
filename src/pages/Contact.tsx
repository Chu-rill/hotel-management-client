import { useState } from "react";
import Navbar from "../components/NavBar";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // You can integrate your backend API or email service here.
  };

  return (
    <div className="min-h-screen bg-hotel-cream pt-20">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 py-12">
        <h1 className="text-3xl font-bold text-hotel-navy text-center mb-8">
          Get in Touch
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="dark:bg-black p-6 rounded-lg shadow-md space-y-4 border ">
            <h2 className="text-2xl font-semibold text-hotel-navy">
              Contact Information
            </h2>
            <p className="text-gray-700">
              We’d love to hear from you! Reach out with any questions,
              feedback, or inquiries.
            </p>
            <div>
              <p>
                <strong>Email:</strong> support@emeraldpalace.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Address:</strong> 123 Emerald Blvd, Lagos, Nigeria
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="dark:bg-black p-6 rounded-lg shadow-md space-y-4 border"
          >
            <h2 className="text-2xl font-semibold text-hotel-navy dark:text-white">
              Send Us a Message
            </h2>
            <Input
              placeholder="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Textarea
              placeholder="Your Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
