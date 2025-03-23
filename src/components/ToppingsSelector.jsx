import { View, StyleSheet } from "react-native"
import SectionHeader from "./SectionHeader"
import Checkbox from "./Checkbox"

const ToppingsSelector = ({ toppings, handleToppingChange, prices }) => {
  return (
    <View style={styles.container}>
      <SectionHeader title="Extra Toppings" optional={true} />

      <View style={styles.optionsContainer}>
        <Checkbox
          selected={toppings.includes("extraCheese")}
          label="Add Extra Cheese"
          price={`+ $${prices.extraCheese.toFixed(2)}`}
          onPress={() => handleToppingChange("extraCheese")}
        />

        <Checkbox
          selected={toppings.includes("mushroom")}
          label="Add Mashroom"
          price={`+ $${prices.mushroom.toFixed(2)}`}
          onPress={() => handleToppingChange("mushroom")}
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

