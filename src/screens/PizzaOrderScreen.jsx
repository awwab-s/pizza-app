import { useState } from "react"
import { View, StyleSheet, ScrollView, Dimensions } from "react-native"
import Header from "../components/Header"
import PizzaInfo from "../components/PizzaInfo"
import SizeSelector from "../components/SizeSelector"
import CrustSelector from "../components/CrustSelector"
import ToppingsSelector from "../components/ToppingsSelector"
import Footer from "../components/Footer"
import { getGoogleDriveImage } from "../context/PizzaContext"

const { width } = Dimensions.get("window")

const PizzaOrderScreen = ({ route }) => {
  const { pizza } = route.params;
  const [size, setSize] = useState("Medium")
  const [crust, setCrust] = useState("Cheese")
  const [toppings, setToppings] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)

  const prices = {
    "Cheese Crust": 150,
    "Extra Cheese": 100,
    "Extra Sauce": 70,
    "Extra Olives": 50,
    "Extra Mushrooms": 50,
  }

  const calculateTotal = () => {
    let total = 0

    // Add size price
    if (size === "Small") total += pizza.size["small"]
    if (size === "Medium") total += pizza.size["medium"]
    if (size === "Large") total += pizza.size["large"]

    // Add cheese crust price
    if (crust === "Cheese") total += prices["Cheese Crust"]

    // Add toppings
    toppings.forEach((topping) => {
      if (prices[topping]) total += prices[topping]
    })

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
        <Header isFavorite={isFavorite} setIsFavorite={setIsFavorite} imgURL={{ uri: getGoogleDriveImage(pizza.imageURL)}} />
        <View style={styles.content}>
          <PizzaInfo pizza = {pizza}/>

          <View style={styles.divider} />

          <SizeSelector size={pizza.size} setSize={setSize} pizzasize={size}/>

          <View style={styles.divider} />

          <CrustSelector crust={crust} setCrust={setCrust} prices={prices} />

          <View style={styles.divider} />

          <ToppingsSelector toppings={toppings} handleToppingChange={handleToppingChange} prices={prices} />
        </View>
      </ScrollView>

      <Footer 
        total={calculateTotal()} 
        pizza={pizza} 
        size={size} 
        crust={crust} 
        toppings={toppings} 
      />
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
  divider: {
    height: 1,
    backgroundColor: "#DDD",
    width: "100%",
    alignSelf: "center",
  },
})

export default PizzaOrderScreen

