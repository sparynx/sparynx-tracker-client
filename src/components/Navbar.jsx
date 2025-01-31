import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Import Firebase Auth Context

const navbarItems = [
  { name: "Home", href: "/" },
  { name: "View DashBoard", href: "/dashboard" },
  { name: "Sign Up", href: "/signup" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth(); // Get the current user from Firebase Auth

  // Function to extract initials from email
  const getInitials = (email) => {
    if (!email) return "";
    const namePart = email.split("@")[0]; // Get the part before "@"
    const words = namePart.split(/[.\-_]/); // Split by dot, hyphen, or underscore
    return words.map((word) => word.charAt(0).toUpperCase()).join(""); // Extract initials
  };

  const handleLogOut = () => {
    // Handle logout
    console.log("Logging out...");
    logOut();
    setIsDropdownOpen(false);
    navigate("/"); // Redirect to Home
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white p-4 fixed w-full top-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        </Link>
        <Link to="/">
          <span className="font-bold">Sparynx BudgetTracker</span>
        </Link>
      </div>

      {/* Mobile Menu Button and Login Icon */}
      <div className="lg:hidden flex items-center space-x-4">
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-8 h-8 flex items-center justify-center"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Login Icon */}
        {!currentUser && (
          <Link to="/signin" className="flex items-center space-x-1 text-white hover:text-gray-600 transition">
            <HiOutlineUser className="size-6" />
            <span className="text-sm font-medium">Login</span>
          </Link>
        )}
      </div>

      {/* Middle Links */}
      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:flex flex-grow justify-center lg:static fixed lg:bg-transparent bg-gray-800 lg:shadow-none shadow-lg top-16 left-0 right-0 bottom-0 lg:bottom-auto lg:w-auto w-64 p-4 lg:p-0 transition-transform duration-300 ease-in-out`}
      >
        <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {navbarItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="text-white hover:underline hover:text-gray-400 transition duration-300 ease-in-out"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Search Bar and Profile */}
      <div className="hidden lg:flex items-center space-x-4">
        {/* Search Bar */}
        <div className="flex flex-row items-center bg-gray-700 rounded-lg p-1 border-none">
          <IoMdSearch size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 rounded bg-gray-700 text-white focus:outline-none"
          />
        </div>

        {/* User Profile Section */}
        <div className="relative">
          {currentUser ? (
            <>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-gray-900 font-bold text-sm">
                  {getInitials(currentUser.email)}
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-500 bg-opacity-75 shadow-lg rounded-md z-40">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                        onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                        onClick={handleLogOut}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/signin"
              className="flex items-center space-x-1 text-white hover:text-gray-600 transition"
            >
              <HiOutlineUser className="size-6" />
              <span className="text-sm font-medium">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;