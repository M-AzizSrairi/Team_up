import React, { useEffect, useState } from 'react';
import VenueCard from './VenueCard';
import SideSearchBar from './SideSearchBar';

const Venues = () => {
  console.log('Rendering Venues component');
  const [venuesData, setVenuesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/getVenues');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType); // Log content type

        if (!contentType) {
          console.warn('Warning: Content type not provided in response headers.');
          return;
        }

        if (contentType.includes('application/json')) {
          const data = await response.json();
          console.log('Fetched data:', data);
          setVenuesData(data);
        } else {
          // Handle non-JSON response here (e.g., show an error to the user)
          const textData = await response.text();
          console.warn('Warning: Unexpected content type. Expected JSON. Data:', textData);
        }
      } catch (error) {
        console.error('Error fetching venue data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex my-4">
      <div className='w-1/4 bg-gray'>
        {/* This is the side search bar where you will filter your data to get accurate research */}
        <SideSearchBar />
      </div>
      <div className="w-3/4 mt-6 mx-8 grid grid-cols-3 gap-4 bg-gray">
        {venuesData.map((venue) => (
          <VenueCard
            key={venue.location}
            imageSrc={venue.images[0]}
            descriptionText={venue.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Venues;
