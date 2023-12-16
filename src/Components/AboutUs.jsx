// AboutUs.js

import React from 'react';
import '../tailwind.css';

const AboutUs = () => {
  return (
    <div className="max-w-full px-4 pt-8 bg-gray text-neutral rounded-md ">
      {/* Centered Text Section */}
      <div className="text-center mx-12">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg my-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        {/* Add more text as needed */}
      </div>

      {/* Scrolling Background with Simple Scroll Effect */}
      <div
        className='relative flex items-center justify-center h-96 bg-fixed bg-parallax bg-cover rounded'
      >
        <div className="w-full h-full absolute top-0 left-0 bg-black opacity-80 z-20"></div>
      </div>
    </div>
  );
};

export default AboutUs;
