import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"

const { width } = Dimensions.get("window")

const Footer = ({ total, pizza, size }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Cart", { pizza: pizza, price: total, size: size })}>
        <Text style={styles.addButtonText} >+ ADD TO CART</Text>
      </TouchableOpacity>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Item Total</Text>
        <Text style={styles.totalAmount}>${total}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.06,
    paddingVertical: width * 0.04,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
  },
  addButton: {
    backgroundColor: "#b55638",
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.06,
    borderRadius: width * 0.1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: width * 0.035,
  },
  totalContainer: {
    marginLeft: width * 0.04,
  },
  totalLabel: {
    fontSize: width * 0.03,
    color: "#8e8e8e",
  },
  totalAmount: {
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
})

export default Footer

