import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native"

const { width, height } = Dimensions.get("window")
const scale = (size) => (width / 375) * size

const CartFooter = ({ totalBill }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.footer}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Bill</Text>
        <Text style={styles.totalAmount}>${totalBill}</Text>
      </View>

      <TouchableOpacity style={styles.placeOrderButton} onPress={() => navigation.navigate("Checkout")}>
        <Text style={styles.buttonText}>Place Order</Text>
        <Icon name="chevron-right" size={scale(20)} color="#121212" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#b55638",
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(32),
    padding: scale(24),
    paddingBottom: scale(24) + (height > 800 ? 16 : 0), // Extra padding for notch devices
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(16),
  },
  totalLabel: {
    fontSize: scale(20),
    fontWeight: "500",
    color: "white",
  },
  totalAmount: {
    fontSize: scale(36),
    fontWeight: "bold",
    color: "white",
  },
  placeOrderButton: {
    backgroundColor: "white",
    borderRadius: scale(30),
    paddingVertical: scale(16),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: scale(16),
    fontWeight: "500",
    color: "#121212",
    marginRight: scale(8),
  },
})

export default CartFooter

