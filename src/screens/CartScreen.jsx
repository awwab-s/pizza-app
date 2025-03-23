import { useState } from "react"
import { View, StyleSheet, ScrollView, Dimensions } from "react-native"
import CartHeader from "../components/CartHeader"
import CartItem from "../components/CartItem"
import CartFooter from "../components/CartFooter"

const { width, height } = Dimensions.get("window")

// Scale factors based on design screen size
const scale = (size) => (width / 375) * size

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Margarita",
      description: "Large | Cheese, onion, and tomato pure",
      price: 57,
      quantity: 1,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Labs__Copy___Copy_-kFHbBe5io7uOheKG8WCEWqCO3EHU9R.png", // Replace with actual image path
    },
    {
      id: 2,
      name: "Tomato",
      description: "Large | Fresh tomatos, Basil & green herbs",
      price: 57,
      quantity: 1,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Labs__Copy___Copy_-kFHbBe5io7uOheKG8WCEWqCO3EHU9R.png", // Replace with actual image path
    },
    {
      id: 3,
      name: "Margarita",
      description: "Large | Cheese, onion, and tomato pure",
      price: 57,
      quantity: 1,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Labs__Copy___Copy_-kFHbBe5io7uOheKG8WCEWqCO3EHU9R.png", // Replace with actual image path
    },
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const totalBill = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <View style={styles.container}>
      <CartHeader />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} />
        ))}
      </ScrollView>

      <CartFooter totalBill={totalBill} />
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
    gap: scale(16),
  },
})

export default CartScreen

