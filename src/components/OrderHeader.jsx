import { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Heart from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const OrderHeader = ({ pizza, imgURL }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const navigation = useNavigation();

  // Fetch favorite status for the current pizza
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const user = JSON.parse(storedUser);

        if (!user || user === "guest" || !user._id) {
          console.log("Guest user detected. Cannot fetch favorite status.");
          setIsGuest(true);
          return;
        }

        const response = await fetch(`http://192.168.18.116:5000/api/users/${user._id}`);
        const data = await response.json();

        if (response.ok) {
          const isFavorite = data.favorites.includes(pizza.id);
          setIsFavorite(isFavorite);
        } else {
          console.error("Failed to fetch user favorites:", data.message);
        }
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };

    fetchFavoriteStatus();
  }, [pizza.id]);

  // Toggle favorite status
  const toggleFavorite = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const user = JSON.parse(storedUser);

      if (!user || user === "guest" || !user._id) {
        console.log("Guest users cannot favorite pizzas.");
        return;
      }

      const endpoint = isFavorite
        ? `http://192.168.18.116:5000/api/users/${user._id}/favorites/remove`
        : `http://192.168.18.116:5000/api/users/${user._id}/favorites/add`;

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pizzaId: pizza.id }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsFavorite(!isFavorite);
        console.log("Favorite status updated successfully:", !isFavorite);
      } else {
        console.error("Failed to update favorite status:", data.message);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={width * 0.05} color="#8e8e8e" />
      </TouchableOpacity>

      <TouchableOpacity 
        disabled={isGuest} // Disable button for guests
        style={[styles.favoriteButton, { opacity: isGuest ? 0.5 : 1 }]}
        onPress={toggleFavorite}
      >
        {isFavorite ? <Heart
          name="heart"
          size={width * 0.05}
          color={"#d00000"}
        /> : <Heart
          name="hearto"
          size={width * 0.05}
          color={"#d00000"} />}
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image
          source={imgURL}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    paddingVertical: width * 0.04,
  },
  backButton: {
    position: "absolute",
    top: width * 0.08,
    left: width * 0.04,
    zIndex: 10,
    backgroundColor: "white",
    padding: width * 0.03,
    borderRadius: width * 0.1,
  },
  favoriteButton: {
    position: "absolute",
    top: width * 0.08,
    right: width * 0.04,
    zIndex: 10,
    backgroundColor: "white",
    padding: width * 0.03,
    borderRadius: width * 0.1,
    
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: width * 0.375,
  },
})

export default OrderHeader

