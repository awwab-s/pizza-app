import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useContext, useEffect, useState } from "react";
import { PizzaItem } from "./HomeScreen";
import { PizzaContext, getGoogleDriveImage } from "../context/PizzaContext";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesScreen = () => {
  const [userData, setUserData] = useState(null);
  const { pizzas, fetchPizzas } = useContext(PizzaContext);

  const fetchUserData = async () => {
    try {      
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            console.log(userDoc.data());
          }      
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Ensure user and user.FavPizza exist
  const favoritePizzaIds = userData?.FavPizza || [];

  // Filter pizzas that match user's favorite pizza IDs
  const favoritePizzas = pizzas.filter(pizza => favoritePizzaIds.includes(pizza.id));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
      </View>
      
        {favoritePizzas.length > 0 ? (
          <FlatList
            data={favoritePizzas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PizzaItem imgURL={ getGoogleDriveImage(item.imageURL) } name= {item.name} price={item.basePrice} discountText="25% Off" />}
          />
        ) : (
          <View style={styles.content}>
            <Text style={styles.subtitle}>You haven't added any favorites yet</Text>
          </View>
        )}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  subtitle: {
    fontSize: 16,
    color: "#868686",
    textAlign: "center",
  },
})

export default FavoritesScreen
