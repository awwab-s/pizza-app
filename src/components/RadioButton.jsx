import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const RadioButton = ({ selected, label, price, onPress, isLast }) => {
  return (
    <TouchableOpacity style={[styles.container, !isLast && styles.borderBottom]} onPress={onPress}>
      <View style={styles.leftContent}>
        <View style={[styles.radio, selected && styles.radioSelected]}>
          {selected && <View style={styles.radioInner} />}
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
  radio: {
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: width * 0.03,
    borderWidth: 2,
    borderColor: "#cccccc",
    marginRight: width * 0.03,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: "#e86a12",
  },
  radioInner: {
    width: width * 0.03,
    height: width * 0.03,
    borderRadius: width * 0.015,
    backgroundColor: "#e86a12",
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

export default RadioButton

