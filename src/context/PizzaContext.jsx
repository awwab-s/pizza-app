import React, { createContext, useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Adjust this import based on your project structure

// Create the context
export const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);

  // Function to fetch pizzas from Firestore
  const fetchPizzas = async () => {
    try {
      const pizzasCollection = collection(db, "pizzas");
      const q = query(pizzasCollection, orderBy("id"));
  
      const pizzasSnapshot = await getDocs(q);
  
      const pizzasList = pizzasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPizzas(pizzasList);
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