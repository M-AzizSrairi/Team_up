// VenueCard.jsx
import React from 'react';
import '../tailwind.css';

const VenueCard = ({ imageSrc, descriptionText }) => {
  return (
    <div className="max-w-sm text-neutral bg-gray border border-neutral rounded-lg shadow">
      <a href="#">
        <img className="rounded-t-lg h-60 w-full object-cover" src={imageSrc} alt="" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Description</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{descriptionText}</p>
        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray text-white bg-emerald rounded-lg hover:bg-orange">
          See more
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default VenueCard;
