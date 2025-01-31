import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="text-center text-white">
        {/* Image with responsive styling and larger size */}
        <img
          src="/404.png" // Replace with the path to your 404 image
          alt="Not Found"
          className="max-w-full h-auto mb-6 w-96" // Larger image size (you can adjust w-96 to fit your needs)
        />

        {/* Decorative Text with link to homepage */}
        <p className="text-2xl font-semibold text-white mt-4">
          <Link
            to="/"
            className="text-yellow-500  decoration-4 hover:text-gray-400 transition duration-300"
          >
            Go back to Homepage
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
