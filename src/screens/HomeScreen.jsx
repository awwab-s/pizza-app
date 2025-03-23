import React, { useState, useEffect } from "react"
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, Dimensions, ActivityIndicator, PermissionsAndroid, Alert } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Search from "../components/Search"
import Category from "../components/Category"
import Geolocation from "react-native-geolocation-service";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

const { width, height } = Dimensions.get('window');

const PizzaItem = ({ imgURL, name, price, discountText }) => {
  return (
    <View style={styles.pizzaItem}>
      <Image source={imgURL} style={styles.pizzaImage} />
      <View style={styles.pizzaDetails}>
        <View style={styles.pizzaNameContainer}>
          <Text style={styles.pizzaName}>{name}</Text>
          <TouchableOpacity>
            <Icon name="heart" size={height * 0.024} color="#868686" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.priceContainer}>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{price}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discountText}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="plus" size={height * 0.02} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const HomeScreen = () => {
  const [location, setLocation] = useState("Select a location");
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkGuestUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user === "guest") {
        setIsGuest(true);
      }
    };

    checkGuestUser();
  }, []);

  // Function to request location permission
  const requestLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Geolocation permission granted");
      return true;
    } else {
      console.log("Geolocation permission denied");
      return false;
    }
  };

  // Function to get user's location
  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Please allow location access.");
      return;
    }

    setLoading(true);

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User location:", latitude, longitude);
        reverseGeocode(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        Alert.alert("Error", "Unable to fetch location.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Function to convert lat/lon into an address
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
      );
      const data = await response.json();

      if (data.display_name) {
        const address = data.display_name;
        showLocationAlert(latitude, longitude, address);
      } else {
        Alert.alert("Error", "Could not retrieve address.");
      }
    } catch (error) {
      console.error("Error getting address:", error);
      Alert.alert("Error", "Failed to fetch address.");
    } finally {
      setLoading(false);
    }
  };

  // Show an alert with location details and save option
  const showLocationAlert = (latitude, longitude, address) => {
    Alert.alert(
      "Confirm Location",
      `Latitude: ${latitude}\nLongitude: ${longitude}\nAddress: ${address}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Save", onPress: () => saveLocation(address) },
      ]
    );
  };

  // Save the location to Firebase Firestore
  const saveLocation = async (address) => {
    const user = auth.currentUser;

    try {
      await setDoc(
        doc(db, "users", user.uid),
        { address: address },
        { merge: true }
      );
      console.log("Address saved successfully.", address);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.locationLabel}>Location</Text>
            <TouchableOpacity
              disabled={isGuest || loading} // Disable button for guests
              onPress={getCurrentLocation}
              style={[styles.locationContainer, { opacity: isGuest ? 0.5 : 1 }]}
            >
              <Ionicons name="location-sharp" size={height * 0.030} color="#B55638" style={{marginRight: 5}} />
              {loading ? (
                <ActivityIndicator size="small" color="#B55638" style={{ marginLeft: 5 }} />
              ) : (
                <>
                  <Text style={styles.locationText}>Set Location</Text>
                  <Icon name="chevron-down" size={height * 0.020} color="#0f0e0d" />
                </>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.notificationContainer}>
            <Ionicons name="cart" size={height * 0.04} color="#0f0e0d" />
            
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
          <Image source={require('../assets/welcome_pizza.png')} style={styles.offerImage} />
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
          <PizzaItem imgURL={require('../assets/welcome_pizza.png')} name="Pepperoni Pizza" price="$10.00" discountText="25% Off" />

          {/* Margherita Pizza */}
          <PizzaItem imgURL={require('../assets/welcome_pizza.png')} name="Margherita Pizza" price="$8.00" discountText="20% Off" />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: width * 0.02,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.024,
    paddingTop: height * 0.024,
  },
  locationLabel: {
    fontSize: height * 0.018,
    color: "#868686",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.004,
  },
  locationText: {
    fontSize: height * 0.024,
    fontWeight: "bold",
    color: "#0f0e0d",
    marginLeft: width * 0.004,
    marginRight: width * 0.004,
  },
  notificationContainer: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: height * 0.012,
    right: width * 0.012,
    width: width * 0.010,
    height: width * 0.010,
    borderRadius: height * 0.005,
    backgroundColor: "#fb3e49",
  },
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
    width: height * 0.180,
    height: height * 0.200,
    position: "absolute",
    right: -(width * 0.020),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.024,
    marginTop: height * 0.032,
  },
  sectionTitle: {
    fontSize: height * 0.024,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  seeAllText: {
    fontSize: height * 0.016,
    fontWeight: "500",
    color: "#B55638",
  },

  pizzaItemsContainer: {
    paddingHorizontal: width * 0.024,
    marginTop: height * 0.024,
    paddingBottom: height * 0.1, 
  },
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
    borderRadius: height * 0.056,
  },
  pizzaDetails: {
    marginLeft: width * 0.016,
    flex: 1,
  },
  pizzaNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pizzaName: {
    fontSize: height * 0.020,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  offerValidity: {
    fontSize: height * 0.014,
    color: "#868686",
    marginTop: height * 0.004,
  },
  pizzaInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.008,
  },
  deliveryTime: {
    fontSize: height * 0.014,
    color: "#868686",
  },
  dot: {
    fontSize: height * 0.014,
    color: "#868686",
    marginHorizontal: width * 0.008,
  },
  rating: {
    fontSize: height * 0.014,
    color: "#868686",
    marginRight: width * 0.004,
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
  },
  price: {
    fontSize: height * 0.020,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  discountBadge: {
    backgroundColor: "#B55638",
    paddingHorizontal: height * 0.008,
    paddingVertical: height * 0.004,
    borderRadius: height * 0.030,
    marginLeft: width * 0.008,
  },
  discountText: {
    fontSize: height * 0.012,
    color: "#ffffff",
  },
  addButton: {
    backgroundColor: "#0f0e0d",
    width: height * 0.045,
    height: height * 0.035,
    borderRadius: height * 0.016,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default HomeScreen
