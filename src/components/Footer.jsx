import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";

const { width } = Dimensions.get("window")

const Footer = ({ total, pizza, size, crust, toppings }) => {
  const handleAddToCart = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please sign in to add items to the cart.");
      navigation.navigate("SignIn");
      return;
    }

    try {
      // Reference to the user's document in the users collection
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const cart = userData.cart || [];

        // Check if the pizza is already in the cart
        const existingPizzaIndex = cart.findIndex((item) => item.pizzaId === pizza.id && item.size === size && item.crust === crust && item.toppings.join() === toppings.join());

        if (existingPizzaIndex !== -1) {
          // If the pizza exists, update quantity and price
          cart[existingPizzaIndex].quantity += 1;
          cart[existingPizzaIndex].price += Number(total);
        } else {
          // Otherwise, add new pizza
          cart.push({
            pizzaId: pizza.id,
            name: pizza.name,
            imageURL: pizza.imageURL,
            size: size,
            crust: crust,
            toppings: toppings,
            price: Number(total),
            quantity: 1,
          });
        }

        // Update the user's cart field
        await updateDoc(userRef, { cart });

        Alert.alert("Success", "Pizza added to cart!");
        console.log("Pizza added to cart:", cart[cart.length - 1]);
        navigation.navigate("Cart");
      } else {
        console.log("User document does not exist.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText} >+ ADD TO CART</Text>
      </TouchableOpacity>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Item Total</Text>
        <Text style={styles.totalAmount}>Rs. {total}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.06,
    paddingVertical: width * 0.04,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
  },
  addButton: {
    backgroundColor: "#b55638",
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.06,
    borderRadius: width * 0.1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: width * 0.035,
  },
  totalContainer: {
    marginLeft: width * 0.04,
  },
  totalLabel: {
    fontSize: width * 0.03,
    color: "#8e8e8e",
  },
  totalAmount: {
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
})

export default Footer

