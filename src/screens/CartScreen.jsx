import { View, Text, StyleSheet, SafeAreaView } from "react-native"

const CartScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Cart</Text>
        <Text style={styles.subtitle}>Your cart is empty</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f0e0d",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#868686",
  },
})

export default CartScreen

