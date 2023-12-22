import React from 'react';
import defaultImage from '../Assets/defaultpitch.jpg'; 
import '../tailwind.css';


const VenueCard = (props) => {
  return (
    <div className="bg-gray h-fit m-4 text-neutral border-b border-neutra mx-8">
      {/* Left column for images */}
      <div className="float-left">
        <img src={defaultImage} alt="Default" className="w-60 h-40 mx-2 py-2" />
      </div>
      
      {/* Right column for details */}
      <div className="px-12">
        {/* Description at the top */}
        <h2 className="text-l text-emerald font-bold mb-4">Venue Description: </h2>
        <p> {props.Description}</p>
        
        {/* Two columns */}
        <div className="flex">
          {/* First column */}
          <div className="flex-1">
            <p>Owner: {props.owner}</p>
            <p>Phone Number: {props.phoneNumber}</p>
            <p>City: {props.city}</p>
            <p>Country: {props.country}</p>
            <p>Location: {props.location}</p>
          </div>
          
          {/* Second column */}
          <div className="flex-1">
            <p>Working Days: {props.workingDays}</p>
            <p>Price: {props.price}</p>
            <p>Capacity: {props.capacity}</p>
            <p>Area: {props.area}</p>
            <p>Facilities: {props.facilities}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
