import React from "react";
import { FiMail, FiPhone, FiLinkedin, FiGithub } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-6 md:px-12 text-gray-800">
      <h1 className="text-3xl font-semibold mb-6 text-center">Contact Me</h1>
      <p className="text-lg text-center mb-8">
        Feel free to reach out for collaborations, inquiries, or just to connect.
      </p>

      <div className="space-y-6">
        {/* Email */}
        <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <FiMail className="text-blue-500 text-2xl" />
          <a href="mailto:adebisitimileyin23@gmail.com" className="text-lg text-gray-800 hover:underline">
            adebisitimileyin23@gmail.com
          </a>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <FiPhone className="text-green-500 text-2xl" />
          <a href="tel:+2349059543322" className="text-lg text-gray-800 hover:underline">
            +234 905 954 3322
          </a>
        </div>

        {/* LinkedIn */}
        <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <FiLinkedin className="text-blue-600 text-2xl" />
          <a
            href="https://www.linkedin.com/in/adebisi-timileyin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-800 hover:underline"
          >
            Adebisi Timileyin
          </a>
        </div>

        {/* GitHub */}
        <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <FiGithub className="text-gray-700 text-2xl" />
          <a
            href="https://github.com/sparynx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-800 hover:underline"
          >
            sparynx
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
