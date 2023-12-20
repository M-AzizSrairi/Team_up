// useLoggedInUser.js
import { useState, useEffect } from 'react';

const useLoggedInUser = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          // Handle the case when the user is not authenticated
          setLoggedInUser(null);
          return;
        }

        const response = await fetch('http://localhost:8000/getLoggedInUser', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLoggedInUser(data);
        } else {
          // Handle the case when the user is not authenticated
          setLoggedInUser(null);
        }
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
        setLoggedInUser(null);
      }
    };

    fetchLoggedInUser();
  }, []);

  return loggedInUser;
};

export default useLoggedInUser;
