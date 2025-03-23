import React, { useState, useEffect } from 'react'

export const UserDataContext = React.createContext()

const UserContext = ({children}) => {
  const [user, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: ''
    }
  });

  useEffect(() => {
    // Check if we have user data in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to validate the token and fetch user data here
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return (
    <UserDataContext.Provider value={[user, setUser]}>
      {children}
    </UserDataContext.Provider>
  );
}
  
export default UserContext
