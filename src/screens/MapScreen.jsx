import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Alert, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

const { width, height } = Dimensions.get('window');

const MapScreen = ({ route }) => {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState('');
  const navigation = useNavigation();

  // HTML template for the OpenStreetMap with Leaflet
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <style>
        body { margin: 0; padding: 0; }
        #map { width: 100%; height: 100vh; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <script>
        let map;
        let marker;
        const defaultLocation = [34, 43];
        const defaultZoom = 4;
        
        function initMap() {
          // Initialize map with default location
          map = L.map('map').setView(defaultLocation, defaultZoom);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
  
          // Try to get user's current location
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 15);
                placeMarker([latitude, longitude]);
              },
              (error) => {
                console.log('Geolocation error:', error);
                // Keep default view if geolocation fails
              }
            );
          }
          
          // Add click event to place marker
          map.on('click', (e) => {
            placeMarker([e.latlng.lat, e.latlng.lng]);
          });
        }
        
        function placeMarker(latlng) {
          if (marker) {
            map.removeLayer(marker);
          }
          marker = L.marker(latlng).addTo(map);
          
          // Send coordinates back to React Native
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'locationSelected',
              coordinates: latlng
            }));
        }
        
        document.addEventListener('DOMContentLoaded', initMap);
      </script>
    </body>
  </html>
  `;
  // Save the location to Firebase Firestore
  const saveLocation = async (address) => {
    const user = auth.currentUser;

    try {
      await setDoc(
        doc(db, "users", user.uid),
        { address: address },
        { merge: true }
      );
      console.log("Address saved successfully:", address);
      Alert.alert("Success", "Address updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving address:", error);
      Alert.alert("Error", "Failed to save address");
    }
  };

  // Handle messages from WebView
  const handleMessage = async (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      if (data.type === 'locationSelected') {
        const { coordinates } = data;
        setSelectedLocation(coordinates);
        
        // Reverse geocode to get address
        const address = await reverseGeocode(coordinates[0], coordinates[1]);
        setAddress(address);
        console.log('Selected address:', address);
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  // Reverse geocode coordinates to get address
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
      );
      const data = await response.json();
      return data.display_name || 'Address not found';
    } catch (error) {
      console.error('Reverse geocode error:', error);
      return 'Address not available';
    }
  };

  // Confirm location selection
  const showLocationAlert = () => {
    if (!selectedLocation) {
      Alert.alert('Location Required', 'Please select a location on the map');
      return;
    }

    if (address === 'Address not found' || address === 'Address not available') {
      console.log('Invalid address');
      Alert.alert('Invalid Location', 'Please select a valid location');
      return;
    }

    const [latitude, longitude] = selectedLocation;

    Alert.alert(
      'Confirm Location',
      `Latitude: ${latitude.toFixed(4)}\nLongitude: ${longitude.toFixed(4)}\n\nAddress:\n${address}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: () => {
            console.log('Latitude:', latitude, 'Longitude:', longitude, 'Address:', address);
            saveLocation(address);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#B55638" />
        </View>
      )}
      
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html }}
        style={styles.webview}
        onMessage={handleMessage}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      
      <View style={styles.bottomContainer}>
        <View style={styles.addressContainer}>
          <Icon name="location-outline" size={20} color="#B55638" />
          <Text style={styles.addressText} numberOfLines={3}>
            {address || 'Tap on the map to select a location'}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.selectButton} onPress={showLocationAlert}>
          <Text style={styles.selectButtonText}>Select Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: width * 0.03,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: width * 0.03,
    elevation: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  addressText: {
    flex: 1,
    marginLeft: width * 0.03,
    fontSize: width * 0.04,
    color: '#333',
  },
  selectButton: {
    backgroundColor: '#B55638',
    padding: width * 0.042,
    borderRadius: width * 0.02,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: width * 0.042,
    fontWeight: 'bold',
  },
});

export default MapScreen;