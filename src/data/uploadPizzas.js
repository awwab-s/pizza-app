import { db } from "../../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import pizzaData from "./pizza.json";

const uploadPizzas = async () => {
  try {
    const pizzaCollection = collection(db, "pizzas");

    for (const pizza of pizzaData) {
      const pizzaDocName = pizza.name.toLowerCase().replace(/\s+/g, "_");
      const pizzaRef = doc(pizzaCollection, pizzaDocName);

      await setDoc(pizzaRef, pizza);
      console.log(`Uploaded: ${pizza.name} (ID: ${pizzaDocName})`);
    }

    console.log("All pizzas uploaded successfully!");
  } catch (error) {
    console.error("Error uploading pizzas:", error);
  }
};

export default uploadPizzas;
