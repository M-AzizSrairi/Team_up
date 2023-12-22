import React from 'react';
import VenueCard from './VenueCard';

const Venues = ({ venues }) => {
  return (
    <div className="venues-list bg-gray">
      <VenueCard/>
    </div>
  );
};

export default Venues;
