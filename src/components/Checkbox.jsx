import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const Checkbox = ({ selected, label, price, onPress, isLast }) => {
  return (
    <TouchableOpacity style={[styles.container, !isLast && styles.borderBottom]} onPress={onPress}>
      <View style={styles.leftContent}>
        <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
          {selected && (
            <View style={styles.checkmark}>
              <View style={styles.checkmarkLine1} />
              <View style={styles.checkmarkLine2} />
            </View>
          )}
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>

      {price && <Text style={styles.price}>{price}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: width * 0.03,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: width * 0.05,
    height: width * 0.05,
    borderWidth: 1,
    borderColor: "#cccccc",
    marginRight: width * 0.03,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: "#e86a12",
    borderColor: "#e86a12",
  },
  checkmark: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  checkmarkLine1: {
    position: "absolute",
    width: "30%",
    height: 2,
    backgroundColor: "white",
    bottom: "45%",
    left: "20%",
    transform: [{ rotate: "45deg" }],
  },
  checkmarkLine2: {
    position: "absolute",
    width: "60%",
    height: 2,
    backgroundColor: "white",
    bottom: "45%",
    right: "10%",
    transform: [{ rotate: "-45deg" }],
  },
  label: {
    fontSize: width * 0.04,
    color: "#0f0e0d",
  },
  price: {
    fontSize: width * 0.04,
    fontWeight: "500",
  },
})

export default Checkbox

