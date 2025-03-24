import { View, StyleSheet } from "react-native"
import SectionHeader from "./SectionHeader"
import Checkbox from "./Checkbox"

const ToppingsSelector = ({ toppings, handleToppingChange, prices }) => {
  return (
    <View style={styles.container}>
      <SectionHeader title="Extra Toppings" optional={true} />

      <View style={styles.optionsContainer}>
        <Checkbox
          selected={toppings.includes("Extra Cheese")}
          label="Add Extra Cheese"
          price={`+ Rs. ${prices["Extra Cheese"].toFixed(2)}`}
          onPress={() => handleToppingChange("Extra Cheese")}
        />

        <Checkbox
          selected={toppings.includes("Extra Sauce")}
          label="Add Extra Sauce"
          price={`+ Rs. ${prices["Extra Sauce"].toFixed(2)}`}
          onPress={() => handleToppingChange("Extra Sauce")}
        />

        <Checkbox
          selected={toppings.includes("Extra Olives")}
          label="Add Extra Olives"
          price={`+ Rs. ${prices["Extra Olives"].toFixed(2)}`}
          onPress={() => handleToppingChange("Extra Olives")}
        />

        <Checkbox
          selected={toppings.includes("Extra Mushrooms")}
          label="Add Extra Mushroom"
          price={`+ Rs. ${prices["Extra Mushrooms"].toFixed(2)}`}
          onPress={() => handleToppingChange("Extra Mushrooms")}
          isLast={true}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 10,
  },
})

export default ToppingsSelector

