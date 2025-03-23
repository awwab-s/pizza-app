import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const PizzaInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Pepperoni Pizza</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>4.5</Text>
          <Text style={styles.starIcon}>★</Text>
        </View>
      </View>

      <Text style={styles.description}>
        Baked to perfection on a crispy golden crust, this pizza delivers the perfect balance of bold flavors and cheesy
        goodness...
        <TouchableOpacity>
          <Text style={styles.readMore}>Read More</Text>
        </TouchableOpacity>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: width * 0.04,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: width * 0.02,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: width * 0.045,
    fontWeight: "500",
    marginRight: width * 0.01,
  },
  starIcon: {
    fontSize: width * 0.045,
    color: "#fcca18",
  },
  description: {
    fontSize: width * 0.035,
    color: "#868686",
    lineHeight: width * 0.05,
  },
  readMore: {
    color: "#e86a12",
    fontWeight: "500",
  },
})

export default PizzaInfo

