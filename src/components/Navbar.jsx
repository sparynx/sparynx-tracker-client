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
  const { currentUser, logOut } = useAuth();

  // Function to extract initials from email
  const getInitials = (email) => {
    if (!email) return "";
    const namePart = email.split("@")[0]; 
    const words = namePart.split(/[.\-_]/); 
    return words.map((word) => word.charAt(0).toUpperCase()).join(""); 
  };

  const handleLogOut = () => {
    logOut();
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    navigate("/");
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

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center space-x-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-8 h-8 flex items-center justify-center"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Middle Links (Desktop) */}
      <div className={`lg:flex flex-1 justify-center ${isMenuOpen ? "flex" : "hidden"} flex-col lg:flex-row lg:static fixed bg-gray-800 lg:bg-transparent w-full lg:w-auto p-4 lg:p-0`}>
        <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {navbarItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="text-white hover:underline hover:text-gray-400 transition duration-300 ease-in-out"
                onClick={() => setIsMenuOpen(false)} 
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button in Mobile Menu */}
        {currentUser && (
          <button
            className="mt-4 lg:hidden w-full text-left text-white hover:underline hover:text-gray-400 transition duration-300 ease-in-out"
            onClick={handleLogOut}
          >
            Logout
          </button>
        )}
      </div>

      {/* Search Bar and Profile (Desktop) */}
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
                        onClick={() => setIsDropdownOpen(false)} 
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
