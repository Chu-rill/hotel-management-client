// Navbar.tsx
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { toast } from "sonner";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user");
    toast.success("Logout successful!");
    // Replace navigate with window.location to force a full page refresh
    window.location.href = "/login";
  };

  return (
    <nav className="bg-hotel-navy text-white py-4 shadow-lg mt-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-semibold text-black dark:text-white">
          <span>InnkeeperPro</span>
        </div>
        <div className="space-x-6 text-lg flex items-center ">
          <Link
            to="/"
            className="hover:text-hotel-cream text-black dark:text-white"
          >
            Home
          </Link>
          <Link
            to="/rooms"
            className="hover:text-hotel-cream text-black dark:text-white"
          >
            Rooms
          </Link>
          <Link
            to="/about"
            className="hover:text-hotel-cream text-black dark:text-white"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-hotel-cream text-black dark:text-white"
          >
            Contact
          </Link>
          <div onClick={() => handleLogout()} className="cursor-pointer">
            <BiLogOut />
          </div>
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
