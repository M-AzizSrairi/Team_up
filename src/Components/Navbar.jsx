// Navbar.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../tailwind.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 96);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 p-4 flex justify-between items-center px-16 z-50 ${
        scrolled ? 'bg-gray shadow-md' : ''
      }`}
    >
      <div className="text-emerald font-bold text-3xl">TeamUp</div>

      <div className="flex text-xl space-x-16">
        <a href="#" className="text-neutral hover:text-emerald">
          About Us
        </a>
        <a href="#" className="text-neutral hover:text-emerald">
          Services
        </a>
        <a href="#" className="text-neutral hover:text-emerald">
          FAQs
        </a>
      </div>

      <Link to="/login">
        <button
          className="rounded-full px-4 py-2 text-neutral bg-orange transition duration-300 ease-in-out hover:bg-emerald"
        >
          Get Started
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
