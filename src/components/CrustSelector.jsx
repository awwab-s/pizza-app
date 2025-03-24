import { View, StyleSheet } from "react-native"
import SectionHeader from "./SectionHeader"
import RadioButton from "./RadioButton"

const CrustSelector = ({ crust, setCrust, prices }) => {
  return (
    <View style={styles.container}>
      <SectionHeader title="Select Crust" required={true} />

      <View style={styles.optionsContainer}>
        <RadioButton selected={crust === "Classic"} label="Classic Hand Tossed" onPress={() => setCrust("Classic")} />

        <RadioButton selected={crust === "Thin"} label="Thin Crust" onPress={() => setCrust("Thin")} />

        <RadioButton
          selected={crust === "Cheese"}
          label="Cheese Brust"
          price={`+ Rs. ${prices["Cheese Crust"].toFixed(2)}`}
          onPress={() => setCrust("Cheese")}
          isLast={true}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  optionsContainer: {
    marginBottom: 10,
  },
})

export default CrustSelector

