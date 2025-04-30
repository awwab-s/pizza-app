import React, { createContext, useState, useEffect } from "react";
import { URL } from "../data/URL";

// Create the context
export const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);

  // Function to fetch pizzas from Firestore
  const fetchPizzas = async () => {
    try {
      const response = await fetch((URL+'/pizzas'));
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.error("Error fetching pizzas:", error);
    }
  };


  // Fetch pizzas when the component mounts
  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <PizzaContext.Provider value={{ pizzas, fetchPizzas }}>
      {children}
    </PizzaContext.Provider>
  );
};


export const getGoogleDriveImage = (imageURL) => {
    try {
      const imageId = imageURL.split('/d/')[1].split('/')[0];
      return `https://drive.google.com/uc?export=view&id=${imageId}`;
    } catch (error) {
      console.error("Invalid Google Drive URL:", imageURL);
      return imageURL;
    }
};