import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const BookingForm = () => {
  // Accessing the location parameter from the URL
  const { encodedLocation } = useParams();

  // Decoding the location parameter
  const decodedLocation = decodeURIComponent(encodedLocation);

  // State for the booking form data
  const [formData, setFormData] = useState({
    day: '',
    time: '',
    numberOfPeople: '',
    // Add other form fields as needed
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send data to the backend)
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Booking Form for Venue at {decodedLocation}</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {/* Example form fields */}
        <div className="mb-4">
          <label htmlFor="day" className="block text-gray-700">Day:</label>
          <input
            type="text"
            id="day"
            name="day"
            value={formData.day}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700">Time:</label>
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="numberOfPeople" className="block text-gray-700">Number of People:</label>
          <input
            type="text"
            id="numberOfPeople"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
          />
        </div>
        {/* Add other form fields as needed */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Validate Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
