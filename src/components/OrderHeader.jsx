import { useState, useEffect } from "react"
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import Heart from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";

const { width, height } = Dimensions.get("window")

const OrderHeader = ({ pizza, imgURL }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const navigation = useNavigation()

  // Fetch favorite status for the current pizza
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const user = auth.currentUser;

      if (!user) {
        console.log("User is not signed in. Cannot fetch favorite status.");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const isFavorite = userData.favorites.includes(pizza.id); // Check if pizza is in favorites
          setIsFavorite(isFavorite);
        }
      } catch (error) {
        console.error("Error fetching favorite status: ", error);
      }
    };

    fetchFavoriteStatus();
  }, [pizza.id]);

  // Toggle favorite status
    const toggleFavorite = async () => {
      const user = auth.currentUser;

      if (!user) { 
        Alert.alert("Login Required", "Please sign in to favorite pizzas.");
        navigation.navigate("SignIn");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
  
        if (isFavorite) {
          // If already a favorite, remove it from favorites
          await updateDoc(userRef, {
            favorites: arrayRemove(pizza.id),
          });
        } else {
          // If not a favorite, add it to favorites
          await updateDoc(userRef, {
            favorites: arrayUnion(pizza.id),
          });
        }
  
        setIsFavorite(!isFavorite);
        console.log("Favorite status updated", !isFavorite);
      } catch (error) {
        console.error("Error updating favorite status: ", error);
      }
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={width * 0.05} color="#8e8e8e" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
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

