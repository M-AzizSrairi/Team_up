// Owner.jsx
import React from 'react';
import OwnerNavbar from './OwnerNavbar';
import AddVenue from './AddVenue';

import '../tailwind.css';

const Owner = () => {
  return (
    <div className='OwnerPage'>
        <OwnerNavbar/>
        <AddVenue/>
    </div>
  );
};

export default Owner;
