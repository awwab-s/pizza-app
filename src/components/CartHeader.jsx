import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native"

const { width } = Dimensions.get("window")
const scale = (size) => (width / 375) * size

const CartHeader = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Main")}>
        <Icon name="chevron-left" size={scale(24)} color="#121212" />
      </TouchableOpacity>
      <Text style={styles.title}>Cart</Text>
      <View style={styles.placeholder} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(16),
    paddingHorizontal: scale(16),
  },
  backButton: {
    padding: scale(8),
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: scale(24),
    fontWeight: "bold",
    color: "#121212",
  },
  placeholder: {
    width: scale(40), // To balance the header
  },
})

export default CartHeader

