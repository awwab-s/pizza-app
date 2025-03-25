import React from "react"
import { View, Text, Image, StyleSheet, Dimensions } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const { width, height } = Dimensions.get('window');

const PizzaItem = ({ imgURL, name, price, discountText, rating }) => {
  return (
    <View style={styles.pizzaItem}>
      <Image source={{ uri: imgURL}} style={styles.pizzaImage} />
      <View style={styles.pizzaDetails}>
        <View style={styles.pizzaNameContainer}>
          <Text style={styles.pizzaName}>{name} Pizza</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{rating}</Text>
          <MaterialIcons name="star" size={height * 0.024} color="#fcca18" />
        </View>
        
        <View style={styles.priceContainer}>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>Rs. {price}</Text>
            {/* <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discountText}</Text>
            </View> */}
          </View>
        </View>
      </View>
    </View>
  )
}

export default PizzaItem

const styles = StyleSheet.create({
  pizzaItem: {
    backgroundColor: "#f8f8f8",
    borderRadius: height * 0.024,
    padding: height * 0.016,
    flexDirection: "row",
    marginBottom: height * 0.016,
  },
  pizzaImage: {
    width: height * 0.112,
    height: height * 0.112,
  },
  pizzaDetails: {
    marginLeft: width * 0.016,
    flex: 1,
    padding: height * 0.005,
    justifyContent: "center",
  },
  pizzaNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pizzaName: {
    fontSize: height * 0.022,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  ratingContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: width * 0.04,
    fontWeight: "500",
    marginRight: width * 0.01,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height * 0.02,
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.02,
  },
  price: {
    fontSize: height * 0.020,
    fontWeight: "bold",
    color: "#B55638",
  },
  discountBadge: {
    backgroundColor: "#B55638",
    paddingHorizontal: height * 0.008,
    paddingVertical: height * 0.004,
    borderRadius: height * 0.030,
  },
  discountText: {
    fontSize: height * 0.012,
    color: "#ffffff",
    fontWeight: "600",
  }
});