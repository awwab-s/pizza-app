import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Search from "../components/Search"
import Category from "../components/Category"

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.locationLabel}>Location</Text>
            <View style={styles.locationContainer}>
              <Icon name="map-pin" size={20} color="#b55638" />
              <Text style={styles.locationText}>New York, USA</Text>
              <Icon name="chevron-down" size={20} color="#0f0e0d" />
            </View>
          </View>
          <View style={styles.notificationContainer}>
            <Icon name="bell" size={20} color="#0f0e0d" />
            <View style={styles.notificationDot} />
          </View>
        </View>

        {/* Search Bar */}
        <Search />

        {/* Special Offer */}
        <View style={styles.offerContainer}>
          <View style={styles.offerContent}>
            <Text style={styles.offerTitle}>Special Offer</Text>
            <Text style={styles.offerSubtitle}>Discount 20% off applied at checkout</Text>
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.orderButtonText}>Order Now</Text>
            </TouchableOpacity>
          </View>
          <Image source={{ uri: "https://via.placeholder.com/180" }} style={styles.offerImage} />
        </View>

        {/* Popular Pizza */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Pizza</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <Category />

        {/* Pizza Items */}
        <View style={styles.pizzaItemsContainer}>
          {/* Pepperoni Pizza */}
          <View style={styles.pizzaItem}>
            <Image source={{ uri: "https://via.placeholder.com/112" }} style={styles.pizzaImage} />
            <View style={styles.pizzaDetails}>
              <View style={styles.pizzaNameContainer}>
                <Text style={styles.pizzaName}>Pepperoni Pizza</Text>
                <TouchableOpacity>
                  <Icon name="heart" size={24} color="#868686" />
                </TouchableOpacity>
              </View>
              <Text style={styles.offerValidity}>Offer valid today only</Text>
              <View style={styles.pizzaInfoContainer}>
                <Text style={styles.deliveryTime}>20min</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.rating}>4.5</Text>
                <MaterialIcons name="star" size={16} color="#fcca18" />
              </View>
              <View style={styles.priceContainer}>
                <View style={styles.priceWrapper}>
                  <Text style={styles.price}>$10.00</Text>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>25% Off</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.addButton}>
                  <Icon name="plus" size={16} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Margherita Pizza */}
          <View style={styles.pizzaItem}>
            <Image source={{ uri: "https://via.placeholder.com/112" }} style={styles.pizzaImage} />
            <View style={styles.pizzaDetails}>
              <View style={styles.pizzaNameContainer}>
                <Text style={styles.pizzaName}>Margherita Pizza</Text>
                <TouchableOpacity>
                  <Icon name="heart" size={24} color="#868686" />
                </TouchableOpacity>
              </View>
              <Text style={styles.offerValidity}>Offer valid today only</Text>
              <View style={styles.pizzaInfoContainer}>
                <Text style={styles.deliveryTime}>30min</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.rating}>4.6</Text>
                <MaterialIcons name="star" size={16} color="#fcca18" />
              </View>
              <View style={styles.priceContainer}>
                <View style={styles.priceWrapper}>
                  <Text style={styles.price}>$8.00</Text>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>20% Off</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.addButton}>
                  <Icon name="plus" size={16} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  locationLabel: {
    fontSize: 18,
    color: "#868686",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f0e0d",
    marginLeft: 4,
    marginRight: 4,
  },
  notificationContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fb3e49",
  },
  offerContainer: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: "#f8f8f8",
    borderRadius: 24,
    padding: 24,
    flexDirection: "row",
    position: "relative",
    overflow: "hidden",
  },
  offerContent: {
    width: "60%",
  },
  offerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  offerSubtitle: {
    fontSize: 18,
    color: "#868686",
    marginTop: 4,
  },
  orderButton: {
    backgroundColor: "#dd714e",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 16,
    alignSelf: "flex-start",
  },
  orderButtonText: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 16,
  },
  offerImage: {
    width: 180,
    height: 180,
    position: "absolute",
    right: -20,
    top: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#dd714e",
  },

  pizzaItemsContainer: {
    paddingHorizontal: 24,
    marginTop: 24,
    paddingBottom: 100, // Add padding to account for bottom navigation
  },
  pizzaItem: {
    backgroundColor: "#f8f8f8",
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    marginBottom: 16,
  },
  pizzaImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  pizzaDetails: {
    marginLeft: 16,
    flex: 1,
  },
  pizzaNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pizzaName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  offerValidity: {
    fontSize: 14,
    color: "#868686",
    marginTop: 4,
  },
  pizzaInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  deliveryTime: {
    fontSize: 14,
    color: "#868686",
  },
  dot: {
    fontSize: 14,
    color: "#868686",
    marginHorizontal: 8,
  },
  rating: {
    fontSize: 14,
    color: "#868686",
    marginRight: 4,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  discountBadge: {
    backgroundColor: "#dd714e",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 30,
    marginLeft: 8,
  },
  discountText: {
    fontSize: 12,
    color: "#ffffff",
  },
  addButton: {
    backgroundColor: "#0f0e0d",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default HomeScreen
