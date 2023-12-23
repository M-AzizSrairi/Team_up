// Owner.jsx
import React from 'react';
import PlayerNavbar from './PlayerNavbar';
import useLoggedInUser from './useLoggedInUser';
import Venues from './Venues';

import '../tailwind.css';

const Player = () => {
  const loggedInUser = useLoggedInUser();

  return (
    <div className="OwnerPage bg-gray">
      {loggedInUser && (
        <>
          <PlayerNavbar />
          <Venues/>
        </>
      )}
    </div>
  );
};

export default Player;
