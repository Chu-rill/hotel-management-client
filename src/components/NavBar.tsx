import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { toast } from "sonner";
import { BiLogOut } from "react-icons/bi";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authUser } = useAuthContext();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user");
    toast.success("Logout successful!");
    // Replace navigate with window.location to force a full page refresh
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white dark:bg-black text-white py-4 shadow-lg fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-semibold text-black dark:text-white">
          <span>InnkeeperPro</span>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black dark:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6 text-lg items-center">
          <Link
            to="/"
            className="hover:text-hotel-cream text-black dark:text-white"
          >
            Home
          </Link>
          {authUser?.role === "admin" && (
            <Link
              to="/admin"
              className="hover:text-hotel-cream text-black dark:text-white"
            >
              Admin
            </Link>
          )}
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
          <div
            onClick={handleLogout}
            className="cursor-pointer text-black dark:text-white"
          >
            <BiLogOut className="w-5 h-5" />
          </div>
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black px-6 py-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="hover:text-hotel-cream text-black dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/admin"
              className="hover:text-hotel-cream text-black dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
            <Link
              to="/about"
              className="hover:text-hotel-cream text-black dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-hotel-cream text-black dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex justify-between items-center">
              <div
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="cursor-pointer text-black dark:text-white flex items-center"
              >
                <BiLogOut className="w-5 h-5 mr-2" />
                <span>Logout</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
