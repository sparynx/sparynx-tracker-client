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
    <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        </Link>
        <Link to="/">
          <span className="font-bold">Sparynx BudgetTracker</span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-8 h-8 flex items-center justify-center"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Middle Links */}
      <div className={`${isMenuOpen ? "flex" : "hidden"} lg:flex flex-grow justify-center`}>
        <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {navbarItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="text-white hover:underline hover:text-gray-400 transition duration-300 ease-in-out"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Search Bar and Profile */}
      <div className="flex items-center space-x-4">
        {/* Search Bar - Hidden on small screens */}
        <div className="hidden lg:flex flex-row items-center bg-gray-700 rounded-lg p-1 border-none">
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
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-gray-900 font-bold text-sm">
                  {getInitials(currentUser.email)}
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral-500 bg-opacity-75 shadow-lg rounded-md z-40">
                  <ul className="py-2">
                    <li>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left" onClick={handleLogOut}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-2 space-y-2 md:space-y-0">
              <Link to="/signin" className="flex items-center space-x-1 text-white hover:text-gray-600 transition">
                <HiOutlineUser className="size-6" />
                <span className="text-sm md:text-base font-medium">Login</span>
              </Link>
            </div>

          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
