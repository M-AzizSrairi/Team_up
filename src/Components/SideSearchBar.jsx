import React, { useState } from 'react';
import { cities, countries, pitchTypes } from './filterOptions'; // Adjust the path accordingly

const SideSearchBar = () => {
  // You can add state and functions to handle filter changes
  // State to track range values
  const [priceRange, setPriceRange] = useState(0);
  const [capacityRange, setCapacityRange] = useState(0);
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedPitchType, setSelectedPitchType] = useState('all');

  return (
    <div className="p-4 text-neutral">
      <h2 className="text-xl font-bold mb-4">Filter Options</h2>

      {/* City filter */}
      <div className="mb-4">
        <label className="block mb-2">City:</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full p-2 border rounded bg-neutral text-gray hover:bg-gray-200"
        >
          {cities.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>
      </div>

      {/* Country filter */}
      <div className="mb-4">
        <label className="block mb-2">Country:</label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full p-2 border rounded bg-neutral text-gray hover:bg-gray-200"
        >
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price range filter */}
      <div className="mb-4">
        <label className="block mb-2">Price Range:</label>
        <input type="range" min="0" max="100" step="5" className="w-full" />
      </div>

      {/* Capacity range filter */}
      <div className="mb-4">
        <label className="block mb-2">Capacity Range: {capacityRange}</label>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={capacityRange}
          onChange={(e) => setCapacityRange(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Pitch Type filter */}
      <div className="mb-4">
        <label className="block mb-2">Pitch Type:</label>
        <select
          value={selectedPitchType}
          onChange={(e) => setSelectedPitchType(e.target.value)}
          className="w-full p-2 border rounded bg-neutral text-gray hover:bg-gray-200"
        >
          <option value="all">All Types</option>
          {pitchTypes.map((pitch) => (
            <option key={pitch.value} value={pitch.value}>
              {pitch.label}
            </option>
          ))}
        </select>
      </div>

      {/* Add more filter options based on your data */}

      <button className="mt-4 bg-emerald text-gray px-4 py-1 rounded hover:bg-orange">
        Apply Filters
      </button>
    </div>
  );
};

export default SideSearchBar;
