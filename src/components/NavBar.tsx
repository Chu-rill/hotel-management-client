// Navbar.tsx
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-hotel-navy text-white py-4 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-semibold text-black dark:text-white">
          <span>InnkeeperPro</span>
        </div>
        <div className="space-x-6 text-lg">
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
        </div>
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
