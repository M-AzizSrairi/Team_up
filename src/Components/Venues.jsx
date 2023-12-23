import React, { useEffect, useState } from 'react';
import VenueCard from './VenueCard';
import SideSearchBar from './SideSearchBar';

const Venues = () => {
  const [venuesData, setVenuesData] = useState([]);
  const [filteredVenuesData, setFilteredVenuesData] = useState([]);

  useEffect(() => {
    // Fetch all venues when the component mounts
    fetchData('/getVenues');
  }, []);

  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`http://localhost:8000${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');

      if (!contentType) {
        console.warn('Warning: Content type not provided in response headers.');
        return;
      }

      if (contentType.includes('application/json')) {
        const data = await response.json();
        setVenuesData(data);
        setFilteredVenuesData(data); // Set filtered data initially to all venues
      } else {
        const textData = await response.text();
        console.warn('Warning: Unexpected content type. Expected JSON. Data:', textData);
      }
    } catch (error) {
      console.error('Error fetching venue data:', error);
    }
  };

  const applyFilters = (filters) => {
    // Construct query parameters from filters
    const queryParams = new URLSearchParams(filters);

    // Fetch filtered data using the new endpoint
    fetchData(`/getFilteredVenues?${queryParams.toString()}`);
  };

  console.log('venuesData:', venuesData);
  
  return (
    <div className="flex my-4 py-4">
      <div className="w-1/4 bg-gray">
        <SideSearchBar applyFilters={applyFilters} />
      </div>
      <div className="w-3/4 mt-6 mx-8 grid grid-cols-3 gap-4 bg-gray">
        {filteredVenuesData.map((venue) => (
         <VenueCard
         key={venue.location}
         imageSrc={venue.images[0]}
         descriptionText={venue.description}
         venueDetails={venue}
       />
        ))}
      </div>
    </div>
  );
};

export default Venues;
