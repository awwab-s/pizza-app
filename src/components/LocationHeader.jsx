import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, PermissionsAndroid, Alert, Dimensions } from "react-native"

import Icon from "react-native-vector-icons/Feather"
import Ionicons from 'react-native-vector-icons/Ionicons';

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import Geolocation from "react-native-geolocation-service";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const LocationHeader = ({isGuest}) => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  
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
      <TouchableOpacity 
        disabled={isGuest || loading}
        onPress={() => navigation.navigate('Cart')}
        style={[styles.cartContainer, { opacity: isGuest ? 0.5 : 1 }]}
      >
        <Ionicons name="cart-outline" size={height * 0.04} color="#0f0e0d" />
      </TouchableOpacity>
    </View>
  )
}

export default LocationHeader

const styles = StyleSheet.create({
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
})