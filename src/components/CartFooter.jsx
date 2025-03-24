import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native"
import { collection, doc, setDoc, getDoc, getDocs, query, where, Timestamp } from "firebase/firestore"
import { auth, db } from "../../firebaseConfig"

const { width, height } = Dimensions.get("window")
const scale = (size) => (width / 375) * size

const CartFooter = ({ totalBill, cartItems }) => {
  const navigation = useNavigation()

  const generateUniqueOrderID = async () => {
    let orderID
    let isUnique = false

    while (!isUnique) {
      orderID = Math.floor(10000 + Math.random() * 90000) // Generate 5-digit number

      // Check Firestore if the order_id already exists
      const ordersRef = collection(db, "orders")
      const q = query(ordersRef, where("order_id", "==", orderID))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        isUnique = true
      }
    }
    return orderID
  }

  const placeOrder  = async () => {
    const user = auth.currentUser

    try {
      const orderID = await generateUniqueOrderID()

      const userDocRef = doc(db, "users", user.uid)
      const userDocSnap = await getDoc(userDocRef)

      const userData = userDocSnap.data()
      const deliveryAddress = userData.address || "No address provided"

      const orderData = {
        order_id: orderID,
        user_id: user.uid,
        order_time: Timestamp.now(),
        total_bill: totalBill,
        pizzas_ordered: cartItems,
        delivery_address: deliveryAddress,
        status: "Pending",
      }

      await setDoc(doc(db, "orders", orderID.toString()), orderData)

      alert("Order placed successfully!")
      console.log("Order placed successfully!", orderData),

      // Clear the cart in Firestore
      await setDoc(doc(db, "users", user.uid), { cart: [] }, { merge: true });
      console.log("Cart cleared", { cart: [] });

      navigation.navigate("Checkout", { orderID })
    } catch (error) {
      console.error("Error placing order:", error)
    }
  }

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      Alert.alert("Empty Cart", "Your cart is empty.")
      return
    }
  
    Alert.alert(
      "Confirm Order",
      "Are you sure you want to place this order?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: placeOrder } // Calls the function to place the order
      ]
    )
  }  

  return (
    <View style={styles.footer}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Bill</Text>
        <Text style={styles.totalAmount}>Rs. {totalBill}</Text>
      </View>

      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
        <Icon name="chevron-right" size={scale(20)} color="#121212" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#b55638",
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(32),
    padding: scale(24),
    paddingBottom: scale(24) + (height > 800 ? 16 : 0), // Extra padding for notch devices
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(16),
  },
  totalLabel: {
    fontSize: scale(20),
    fontWeight: "500",
    color: "white",
  },
  totalAmount: {
    fontSize: scale(36),
    fontWeight: "bold",
    color: "white",
  },
  placeOrderButton: {
    backgroundColor: "white",
    borderRadius: scale(30),
    paddingVertical: scale(16),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: scale(16),
    fontWeight: "500",
    color: "#121212",
    marginRight: scale(8),
  },
})

export default CartFooter

