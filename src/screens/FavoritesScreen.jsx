import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Dimensions, ActivityIndicator, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import PizzaList from "../components/PizzaList";
import { PizzaContext, getGoogleDriveImage } from "../context/PizzaContext";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

const FavoritesScreen = () => {
  const [userData, setUserData] = useState(null);
  const { pizzas, fetchPizzas } = useContext(PizzaContext);
  const [loadingPizzas, setLoadingPizzas] = useState(true);

  const fetchUserData = async () => {
    try {      
      const user = auth.currentUser;
      if (!user) {
        alert("Please sign in to view favorites.");
        navigation.navigate("SignIn");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        console.log(userDoc.data());
      }
      setLoadingPizzas(false);    
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoadingPizzas(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const favoritePizzaIds = userData?.favorites || [];

  // Filter pizzas that match user's favorite pizza IDs
  const favoritePizzas = pizzas.filter(pizza => favoritePizzaIds.includes(pizza.id));

  // Function to handle removing pizza from favorites
  const removeFromFavorites = async (pizzaId) => {
    const user = auth.currentUser;

    try {
      const userRef = doc(db, "users", user.uid);

      // Remove pizza from favorites array in Firestore
      await updateDoc(userRef, {
        favorites: arrayRemove(pizzaId),
      });

      // Update userData state to reflect changes
      setUserData(prevData => ({
        ...prevData,
        favorites: prevData.favorites.filter(id => id !== pizzaId),
      }));

      console.log("Pizza removed from favorites.", pizzaId);
    } catch (error) {
      console.error("Error removing pizza from favorites:", error);
    }
  };

  const handlePizzaPress = (pizza) => {
    Alert.alert(
      "Remove from Favorites",
      "Remove pizza from favorites?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => removeFromFavorites(pizza.id),
        },
      ]
    );
  };

  const handleRefresh = () => {
    fetchUserData();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Favorites</Text>
          <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
            <Icon name="refresh" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.favoritesContainer}>
          {loadingPizzas ? (
            <ActivityIndicator size="large" color="#B55638" />
          ) : favoritePizzas.length > 0 ? (
            <PizzaList pizzas={favoritePizzas} onPress={handlePizzaPress} />
          ) : (
            <View style={styles.content}>
              <Text style={styles.subtitle}>You haven't added any favorites yet</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.03,
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  refreshButton: {
    backgroundColor: "#B55638",
    width: 45,
    height: 45,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#DDD",
    marginBottom: height * 0.02,
    width: "90%",
    alignSelf: "center",
  },
  favoritesContainer: {
    flex: 1,
    paddingHorizontal: width * 0.04,
  },
  title: {
    fontSize: width * 0.06,
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
