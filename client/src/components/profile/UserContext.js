// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the user data here

  // Fetch user data from localStorage or API on component mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");

    if (userId && authToken) {
      // Fetch user data from your API (adjust the URL as needed)
      fetch(`http://localhost:3000/user/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
        .then((response) => response.json())
        .then((data) => setUser(data)) // Set the user data
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []); // This effect runs once after the first render

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children} {/* This will wrap the rest of your app */}
    </UserContext.Provider>
  );
};

export default UserContext;
