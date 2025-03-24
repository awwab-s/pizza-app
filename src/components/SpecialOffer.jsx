import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');

const SpecialOffer = () => {
  return (
    <View style={styles.offerContainer}>
      <View style={styles.offerContent}>
        <Text style={styles.offerTitle}>Special Offer</Text>
        <Text style={styles.offerSubtitle}>Discount 25% off for all pizzas.</Text>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
      <Image source={require('../assets/special_offer_pizza.png')} style={styles.offerImage} />
    </View>
  )
}

export default SpecialOffer

const styles = StyleSheet.create({
  offerContainer: {
    marginHorizontal: width * 0.024,
    marginTop: height * 0.024,
    backgroundColor: "#f8f8f8",
    borderRadius: height * 0.024,
    padding: height * 0.024,
    flexDirection: "row",
    position: "relative",
    overflow: "hidden",
  },
  offerContent: {
    width: "60%",
  },
  offerTitle: {
    fontSize: height * 0.024,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  offerSubtitle: {
    fontSize: height * 0.018,
    color: "#868686",
    marginTop: height * 0.004,
  },
  orderButton: {
    backgroundColor: "#B55638",
    paddingHorizontal: width * 0.024,
    paddingVertical: height * 0.012,
    borderRadius: height * 0.030,
    marginTop: height * 0.016,
    alignSelf: "flex-start",
  },
  orderButtonText: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: height * 0.016,
  },
  offerImage: {
    width: height * 0.19,
    height: height * 0.19,
    position: "absolute",
    right: 0,
  },
})