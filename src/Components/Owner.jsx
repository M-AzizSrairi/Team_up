// Owner.jsx
import React from 'react';
import OwnerNavbar from './OwnerNavbar';
import AddVenue from './AddVenue';
import useLoggedInUser from './useLoggedInUser';

import '../tailwind.css';

const Owner = () => {
  const loggedInUser = useLoggedInUser();

  return (
    <div className="OwnerPage">
      {loggedInUser && (
        <>
          <OwnerNavbar loggedInUsername={loggedInUser.username} />
          <AddVenue />
        </>
      )}
    </div>
  );
};

export default Owner;
