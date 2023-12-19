import React, { useState } from 'react';

const AddVenue = () => {
  const [venueData, setVenueData] = useState({
    ownerName: '',
    phoneNumber: '',
    city: '',
    country: '',
    location: '',
    workingDays: '',
    price: '',
    capacity: '',
    area: '',
    facilities: '',
    description: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData({
      ...venueData,
      [name]: value,
    });
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    setVenueData({
      ...venueData,
      images: [...venueData.images, ...files],
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to submit the form data
    console.log('Form submitted:', venueData);
  };

  return (
    <div className="bg-gray text-neutral grid grid-cols-3 gap-4 p-8">
      {/* First Column */}
      <div className="px-6 pt-6 border-x border-y border-neutral rounded-lg col-span-1">
        <h2 className="text-xl font-semibold mb-4">Owner Information</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="ownerName" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={venueData.ownerName}
              onChange={handleChange}
              className="mt-1 p-2 bg-neutral text-gray w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={venueData.phoneNumber}
              onChange={handleChange}
              className="mt-1 bg-neutral text-gray p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={venueData.city}
              onChange={handleChange}
              className="mt-1 p-2 bg-neutral text-gray w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={venueData.country}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-neutral text-gray border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
              Location on Maps
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={venueData.location}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-neutral text-gray  border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
              Working Days
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={venueData.workingDays}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-neutral text-gray border rounded-md"
            />
          </div>
          {/* Add other owner information fields */}
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
                className="mt-1 p-2 w-full bg-neutral text-grayborder rounded-md"
            />
            </div>
            <div className="mb-4">
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                Capacity
            </label>
            <input
                type="text"
                id="capacity"
                name="capacity"
                value={venueData.capacity}
                onChange={handleChange}
                className="mt-1 p-2 w-full border bg-neutral text-grayrounded-md"
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
            <label htmlFor="facilities" className="block text-sm font-medium text-gray-700">
                Facilities
            </label>
            <input
                type="text"
                id="facilities"
                name="facilities"
                value={venueData.facilities}
                onChange={handleChange}
                className="mt-1 p-2 w-full border bg-neutral text-gray rounded-md"
            />
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
            {/* Add other venue details fields */}
        </form>
        </div>


      {/* Third Column */}
      <div className="px-6 pt-6 border-x border-y border-neutral rounded-lg col-span-1">
        <div className='h-5/6'>
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
                onChange={handleFileInputChange}
                className="hidden"
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
          className="bg-emerald text-gray  w-full py-1 px-4 rounded-md hover:bg-orange"
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
