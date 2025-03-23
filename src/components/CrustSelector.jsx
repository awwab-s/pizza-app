import { View, StyleSheet } from "react-native"
import SectionHeader from "./SectionHeader"
import RadioButton from "./RadioButton"

const CrustSelector = ({ crust, setCrust, prices }) => {
  return (
    <View style={styles.container}>
      <SectionHeader title="Select Crust" required={true} />

      <View style={styles.optionsContainer}>
        <RadioButton selected={crust === "classic"} label="Classic Hand tossed" onPress={() => setCrust("classic")} />

        <RadioButton selected={crust === "thin"} label="Thin Crust" onPress={() => setCrust("thin")} />

        <RadioButton
          selected={crust === "cheese"}
          label="Cheese Brust"
          price={`+ $${prices.cheeseCrust.toFixed(2)}`}
          onPress={() => setCrust("cheese")}
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

