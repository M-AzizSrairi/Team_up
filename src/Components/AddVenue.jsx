import React, { useState, useEffect } from 'react';
import useLoggedInUser from './useLoggedInUser';
import {pitchTypes } from './filterOptions';
import { parseJwt } from './authUtils';

const AddVenue = () => {
  const loggedInUser = useLoggedInUser(); 

  useEffect(() => {
    console.log('Logged-in user:', loggedInUser);

    // Set venueData based on user data
    setVenueData((prevData) => ({
      ...prevData,
      ownerusername: loggedInUser ? loggedInUser.sub : '',
    }));
  }, [loggedInUser]);

  useEffect(() => {
    console.log('Logged-in user:', loggedInUser);
  }, [loggedInUser]);

  const [venueData, setVenueData] = useState({
    ownerusername: '',
    ownername: '',
    phonenumber: '',
    city: '',
    country: '',
    location: '',
    workingdays: '',
    price: '',
    capacity: '',
    area: '',
    ground: '',
    description: '',
    images: [],
  });



  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData({
      ...venueData,
      [name]: name === 'capacity' ? parseInt(value, 10) : value,
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setVenueData({
      ...venueData,
      images: [...venueData.images, ...files],
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleChooseFiles = (e) => {
    const files = Array.from(e.target.files);
    setVenueData({
      ...venueData,
      images: [...venueData.images, ...files],
    });
  };

// Update the handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Submit button clicked');
  // Debugging statements
  console.log('Sending request with data:', venueData);
  console.log(localStorage.getItem('accessToken'));
  if (
    Object.values(venueData).some((value) => !value) ||
    venueData.images.length === 0
  ) {
    setError('Please fill in all required fields.');
    return;
  }

  try {
    // Check if user is authenticated
    const token = localStorage.getItem('accessToken');
    console.log('access token', localStorage.getItem('accessToken'));
    if (!token) {
      console.error('Authentication token not found. Please log in.');
      setError('Authentication token not found. Please log in.');
      return;
    }

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      venueData.images.map(async (image) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'uploadteamup');

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dxmjwxbi7/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        if (response.ok) {
          const imageData = await response.json();
          return imageData.secure_url;
        } else {
          console.error('Error uploading image to Cloudinary.');
          return null;
        }
      })
    );

    // Send form data and image URLs to FastAPI backend
    const response = await fetch('http://localhost:8000/createVenue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...venueData,
        images: imageUrls,
      }),
    });

    console.log('Request:', response);

    // Handle the response
    if (response.ok) {
      console.log('Venue data submitted successfully.');
      // Optionally, you can reset the form or redirect the user after a successful submission.
    } else {
      const errorData = await response.json();
      console.error('Error submitting venue data:', errorData);
      setError(
        errorData.detail || 'Error submitting venue data. Please try again.'
      );
    }
  } catch (error) {
    console.error('Error submitting venue data:', error);
    setError('An unexpected error occurred. Please try again.');
  }
};


  return (
    <div className="bg-gray text-neutral grid grid-cols-3 gap-4 p-8">
      {/* First Column */}
      <div className="px-6 pt-6 border-x border-y border-neutral rounded-lg col-span-1">
        <h2 className="text-xl font-semibold mb-4">Owner Information</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="ownername" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="ownername"
              name="ownername"
              value={venueData.ownername}
              onChange={handleChange}
              className="mt-1 p-2 bg-neutral text-gray w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phonenumber"
              name="phonenumber"
              value={venueData.phonenumber}
              onChange={handleChange}
              className="mt-1 bg-neutral text-gray p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={venueData.city}
              onChange={handleChange}
              className="mt-1 p-2 bg-neutral text-gray w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={venueData.country}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-neutral text-gray border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location on Maps
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={venueData.location}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-neutral text-gray  border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="workingdays" className="block text-sm font-medium text-gray-700">
              Working Days
            </label>
            <input
              type="text"
              id="workingdays"
              name="workingdays"
              value={venueData.workingdays}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-neutral text-gray border rounded-md"
            />
          </div>
        </form>
      </div>

      {/* Second Column */}
      <div className="px-6 pt-6 border-x border-y border-neutral rounded-lg col-span-1">
        <h2 className="text-xl font-semibold mb-4">Venue Details</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={venueData.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-neutral text-gray border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={venueData.capacity}
              onChange={handleChange}
              className="mt-1 p-2 w-full border bg-neutral text-gray rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">
              Area (Dimensions of the football field)
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={venueData.area}
              onChange={handleChange}
              className="mt-1 p-2 w-full border bg-neutral text-gray rounded-md"
            />
          </div>
            <div className="mb-4">
            <label htmlFor="ground" className="block text-sm font-medium text-gray-700">
              Ground
            </label>
            <select
              id="ground"
              name="ground"
              value={venueData.ground}
              onChange={handleChange}
              className="mt-1 p-2 w-full border bg-neutral text-gray rounded-md"
            >
              <option value="" disabled>Select Ground</option>
              {pitchTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={venueData.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border bg-neutral text-gray rounded-md"
            />
          </div>
        </form>
      </div>

        {/* Third Column */}
            <div className="px-6 pt-6 border-x border-y border-neutral rounded-lg col-span-1">
        <div className="h-5/6">
          <h2 className="text-xl font-semibold mb-4">Image Upload</h2>
          <div
            className="border-dashed border-2 border-gray-300 p-8 mb-4 flex flex-col items-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p className="text-gray-500">Drag and drop images here</p>
            <label htmlFor="images" className="cursor-pointer text-emerald font-medium mt-2">
              Choose files
              <input
                type="file"
                id="images"
                name="images"
                className="hidden"
                onChange={handleChooseFiles}
                multiple
              />
            </label>
          </div>
          <div>
              <h3 className="text-lg font-medium mb-2">Uploaded Images:</h3>
              <ul>
                {venueData.images.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
          </div>
        </div>

        {/* Submit Button */}
        <div className="inset-x-0 bottom-0">
          <button
            className="bg-emerald text-gray w-full py-1 px-4 rounded-md hover:bg-orange"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVenue;
