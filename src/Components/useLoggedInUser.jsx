import { useState, useEffect } from 'react';
import { parseJwt } from './authUtils';

const useLoggedInUser = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          setLoggedInUser(null);
          return;
        }

        const decodedUser = parseJwt(accessToken);

        setLoggedInUser(decodedUser);
      } catch (error) {
        console.error('Error decoding logged-in user:', error);
        setLoggedInUser(null);
      }
    };

    fetchLoggedInUser();
  }, []);

  return loggedInUser;
};

export default useLoggedInUser;