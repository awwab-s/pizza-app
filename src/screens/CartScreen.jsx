import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from "react-native"
import CartHeader from "../components/CartHeader"
import CartItem from "../components/CartItem"
import CartFooter from "../components/CartFooter"
import { useNavigation } from "@react-navigation/native"
import { getDoc, doc, updateDoc } from "firebase/firestore"
import { auth, db } from "../../firebaseConfig"

const { width, height } = Dimensions.get("window")

// Scale factors based on design screen size
const scale = (size) => (width / 375) * size

const CartScreen = ({pizza, price, size}) => {
  const navigation = useNavigation()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCartItems = async () => {
      const user = auth.currentUser
      console.log("User:", user.uid)

      if (!user) {
        alert("Please sign in to view your cart.")
        navigation.navigate("SignIn")
        return
      }

      try {
        const userDocRef = doc(db, "users", user.uid)
        const userDocSnap = await getDoc(userDocRef)

        const cartData = userDocSnap.exists() ? userDocSnap.data().cart || [] : []

        setCartItems(cartData)
        console.log("Fetched cart data:", cartData)
        setLoading(false)

      } catch (error) {
        console.error("Error fetching cart data:", error)
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [])

  const updateQuantity = async (item_no, newQuantity) => {
    if (newQuantity < 1) return // Prevent zero quantity
  
    const user = auth.currentUser
    if (!user) return
  
    try {
      const userDocRef = doc(db, "users", user.uid)
  
      // Get updated cart items
      const updatedCart = cartItems.map((item) =>
        item.item_no === item_no ? { ...item, quantity: newQuantity } : item
      )
  
      // Update Firestore: Overwrite only the cart field
      await updateDoc(userDocRef, { cart: updatedCart })
  
      // Update local state
      setCartItems(updatedCart)
    } catch (error) {
      console.error("Error updating quantity:", error)
    }
  }

  const handleDeleteItem = async (item_no) => {
    const user = auth.currentUser

    try {
      const userDocRef = doc(db, "users", user.uid)
  
      // Remove the item from the cart
      const updatedCart = cartItems.filter((item) => item.item_no !== item_no)
  
      // Update Firestore: Overwrite only the cart field
      await updateDoc(userDocRef, { cart: updatedCart })
  
      // Update local state
      setCartItems(updatedCart)
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  };

  const totalBill = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0

  return (
    <View style={styles.container}>
      <CartHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#b55638" />
        ) : cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem key={item.item_no} item={item} onUpdateQuantity={updateQuantity} onDelete={handleDeleteItem} />
          ))
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your cart is empty!</Text>
          </View>
        )}
      </ScrollView>

      <CartFooter totalBill={totalBill} cartItems={cartItems} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(16),
    gap: 2
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyCartText: {
    fontSize: 16,
    color: "#868686",
    textAlign: "center",
  },
})

export default CartScreen

