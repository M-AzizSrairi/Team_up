import React, { useState } from 'react';
import VenueDetailsOverlay from './VenueDetailsOverlay';
import '../tailwind.css';

const VenueCard = ({ imageSrc, descriptionText, venueDetails }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  return (
    <div className="max-w-sm text-neutral bg-gray border border-neutral rounded-lg shadow">
      <div>
        <img className="rounded-t-lg h-60 w-full object-cover" src={imageSrc} alt="" />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Description</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{descriptionText}</p>
        <button
          onClick={handleShowDetails}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray text-white bg-emerald rounded-lg hover:bg-orange"
        >
          See more
        </button>
      </div>
      {/* Render VenueDetailsOverlay only when showDetails is true */}
      {showDetails && <VenueDetailsOverlay venueDetails={venueDetails} onClose={() => setShowDetails(false)} />}
    </div>
  );
};

export default VenueCard;
