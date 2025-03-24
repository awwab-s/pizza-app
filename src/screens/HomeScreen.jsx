import React, { useState, useEffect, useContext } from "react"
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, Dimensions, ActivityIndicator, PermissionsAndroid, Alert, FlatList } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import Ionicons from 'react-native-vector-icons/Ionicons';

import { PizzaContext, getGoogleDriveImage } from "../context/PizzaContext";

import Search from "../components/Search"
import Category from "../components/Category"
import SpecialOffer from "../components/SpecialOffer";
import PizzaList from "../components/PizzaList";
import PizzaItem from "../components/PizzaItem";

import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import Geolocation from "react-native-geolocation-service";

const { width, height } = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [location, setLocation] = useState("Select a location");
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPizzas, setLoadingPizzas] = useState(true);
  const { pizzas, fetchPizzas } = useContext(PizzaContext);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPizzas, setFilteredPizzas] = useState(pizzas);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsGuest(!user); // User is not logged in
    });
  
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingPizzas(true);
      await fetchPizzas();
      setLoadingPizzas(false);
    };
    
    fetchData();
  }, []);
  
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPizzas(pizzas);
    } else if (selectedCategory === 'Vegetarian') {
      setFilteredPizzas(pizzas.filter(pizza => pizza.category.includes('Vegetable')));
    } else if (selectedCategory === 'Specials') {
      setFilteredPizzas(pizzas.filter(pizza => pizza.category.includes('Special')));
    } else {
      setFilteredPizzas(pizzas.filter(pizza => pizza.category.includes(selectedCategory)));
    }
  }, [selectedCategory, pizzas]);  

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
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View style={styles.cartContainer}>
            <Ionicons name="cart-outline" size={height * 0.04} color="#0f0e0d" />
            
          </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <Search />

        {/* Special Offer */}
        <SpecialOffer />

        {/* Pizza Menu */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Choose Your Pizza</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        {/* Pizza Items */}
        <View style={styles.pizzaItemsContainer}>
          {loadingPizzas ? (
            <ActivityIndicator size="large" color="#B55638" />
          ) : (
            <PizzaList pizzas={filteredPizzas} navigation={navigation} />
          )}
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
    paddingVertical: height * 0.024,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.024,
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
  cartContainer: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
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
  },
})

export default HomeScreen
