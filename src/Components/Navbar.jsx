// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';  // Import the Link component
import '../tailwind.css';

const Navbar = () => {
  return (
    <nav className="fixed top-0 pt-4 left-0 right-0 p-4 flex justify-between items-center px-16 z-50">
      <div className="text-emerald font-bold text-3xl">TeamUp</div>

      <div className="flex text-xl space-x-16">
        <a href="#" className="text-neutral hover:text-emerald">About Us</a>
        <a href="#" className="text-neutral hover:text-emerald">Services</a>
        <a href="#" className="text-neutral hover:text-emerald">FAQs</a>
      </div>

      {/* Replace the button with Link */}
      <Link to="/auth">
        <button className="bg-orange text-white rounded-full px-4 py-2 transition duration-300 ease-in-out hover:bg-emerald">
          Get Started
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
