import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")
const scale = (size) => (width / 375) * size

const QuantityControl = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onDecrease}>
        <Text style={styles.buttonText}>−</Text>
      </TouchableOpacity>

      <Text style={styles.quantity}>{quantity}</Text>

      <TouchableOpacity style={styles.button} onPress={onIncrease}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: scale(20),
    paddingHorizontal: scale(12),
    paddingVertical: scale(4),
    alignSelf: "flex-end",
  },
  button: {
    width: scale(24),
    height: scale(24),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: scale(18),
    color: "#434343",
  },
  quantity: {
    marginHorizontal: scale(12),
    fontSize: scale(16),
    fontWeight: "500",
    color: "#121212",
  },
})

export default QuantityControl

