import React from 'react';
import { FaWindowClose } from 'react-icons/fa';
import '../tailwind.css';

const VenueDetailsOverlay = ({ venueDetails, onClose }) => {
  // Destructuring properties from venueDetails
  const { images, description, city, area, country, price, workingdays, capacity, ground, location } = venueDetails;

  return (
    <>
      {/* Background filter */}
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-40" onClick={onClose}></div>

      {/* Venue details overlay */}
      <div className="fixed top-1/4 left-1/4 w-2/4 h-2/3 bg-gray text-gray-800 flex z-50 shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/3 bg-neutral p-6">
          {/* Display all images on the left 1/3*/}
          {images.map((imageUrl, index) => (
            <img key={index} className="mb-4 w-full h-32 object-cover rounded-lg" src={imageUrl} alt={`Image ${index + 1}`} />
          ))}
        </div>
        <div className="w-2/3 p-6 flex flex-col justify-between">
          <div>
            {/* Venue details on the right 2/3 */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-8">{description}</h2>
            </div>
            <div className="inline-grid grid-cols-2 gap-x-24">
            <div>
            <div className='mb-4'>
                <span className="font-semibold">Location:</span> <a href={location} target="_blank" rel="noopener noreferrer" className="text-emerald hover:underline">See Maps</a>
            </div>
            <div className="mb-4">
              <span className="font-semibold">City:</span> {city}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Country:</span> {country}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Working Days:</span> {workingdays}
            </div>
          </div>
          <div>
              <div className="mb-4">
                <span className="font-semibold">Price:</span> {price}
              </div>
              <div className="mb-4">
                <span className="font-semibold">Capacity:</span> {capacity}
              </div>
              <div className="mb-4">
                <span className="font-semibold">Ground:</span> {ground}
              </div>
              <div className="mb-4">
                <span className="font-semibold">Area:</span> {area}
              </div>
          </div>
          </div>
          </div>
                    <button className='bg-emerald w-full rounded p-2 text-gray'>
                        Book Now!
                    </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-orange text-xl hover:text-orange p-2"
        >
          <FaWindowClose />
        </button>
      </div>
    </>
  );
};

export default VenueDetailsOverlay;
