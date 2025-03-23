import { useState } from "react"
import { View, StyleSheet, ScrollView, Dimensions } from "react-native"
import Header from "../components/Header"
import PizzaInfo from "../components/PizzaInfo"
import SizeSelector from "../components/SizeSelector"
import CrustSelector from "../components/CrustSelector"
import ToppingsSelector from "../components/ToppingsSelector"
import Footer from "../components/Footer"

const { width } = Dimensions.get("window")

const PizzaOrder = () => {
  const [size, setSize] = useState("medium")
  const [crust, setCrust] = useState("cheese")
  const [toppings, setToppings] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)

  const prices = {
    small: 8,
    medium: 12,
    large: 16,
    cheeseCrust: 1.5,
    extraCheese: 2.5,
    mushroom: 2.5,
  }

  const calculateTotal = () => {
    let total = 0

    // Add size price
    if (size === "small") total += prices.small
    if (size === "medium") total += prices.medium
    if (size === "large") total += prices.large

    // Add cheese crust price
    if (crust === "cheese") total += prices.cheeseCrust

    // Add toppings
    if (toppings.includes("extraCheese")) total += prices.extraCheese
    if (toppings.includes("mushroom")) total += prices.mushroom

    return total.toFixed(2)
  }

  const handleToppingChange = (topping) => {
    if (toppings.includes(topping)) {
      setToppings(toppings.filter((t) => t !== topping))
    } else {
      setToppings([...toppings, topping])
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header isFavorite={isFavorite} setIsFavorite={setIsFavorite} imgURL={require('../assets/welcome_pizza.png')} />
        <View style={styles.content}>
          <PizzaInfo />

          <SizeSelector size={size} setSize={setSize} prices={prices} />

          <CrustSelector crust={crust} setCrust={setCrust} prices={prices} />

          <ToppingsSelector toppings={toppings} handleToppingChange={handleToppingChange} prices={prices} />
        </View>
      </ScrollView>

      <Footer total={calculateTotal()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    paddingHorizontal: width * 0.06,
    paddingBottom: width * 0.06,
  },
})

export default PizzaOrder

