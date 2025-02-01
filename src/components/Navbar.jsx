import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

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
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-8 h-8 flex items-center justify-center">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex flex-grow justify-center">
        <ul className="flex flex-row gap-8 whitespace-nowrap">
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

      {/* Search Bar and Profile (Desktop) */}
      <div className="hidden lg:flex items-center space-x-4">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-700 rounded-lg p-1">
          <IoMdSearch size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 bg-gray-700 text-white focus:outline-none rounded"
          />
        </div>

        {/* User Profile */}
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
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 shadow-lg rounded-md z-40">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-600 w-full text-left"
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
            <Link to="/signin" className="flex items-center space-x-1 text-white hover:text-gray-600 transition">
              <HiOutlineUser className="size-6" />
              <span className="text-sm font-medium">Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-64 h-full bg-gray-800 p-6 z-50 flex flex-col shadow-lg">
          <button onClick={() => setIsMenuOpen(false)} className="self-end text-white mb-4">
            <FaTimes size={24} />
          </button>
          <ul className="space-y-4">
            {navbarItems.map((item) => (
              <li key={item.name}>
                <Link to={item.href} className="text-white hover:underline hover:text-gray-400" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          {currentUser && (
            <button
              className="mt-4 w-full text-left text-white hover:underline hover:text-gray-400"
              onClick={handleLogOut}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
