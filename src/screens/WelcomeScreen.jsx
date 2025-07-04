import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
  
        if (storedUser && storedUser !== "guest") {
          console.log("User detected from AsyncStorage. Redirecting to Home screen.");
          navigation.replace("Main");
        } else {
          console.log("No authenticated user active. Staying on Welcome screen.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking user login:", error);
        setLoading(false);
      }
    };
  
    checkUser();
  }, []);

  const handleGuestLogin = async () => {
    await AsyncStorage.setItem('user', 'guest');
    console.log('Guest user saved to AsyncStorage!');
    navigation.navigate('Main');
  };

  // if (loading) {
  //   // Show a loading spinner while checking authentication
  //   return (
  //     <SafeAreaView style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#B55638" />
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo_small.png')} style={styles.logo} />
      </View>

      <View style={styles.imageContainer}>
        <Image source={require('../assets/welcome_pizza.png')} style={styles.welcomeImage} />
      </View>


      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to Pizzario</Text>
        <Text style={styles.subtitle}>
          Your favorite pizzas, crafted with the finest ingredients for a delicious experience!
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signInButtonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpButtonText}>Sign me up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#B55638" />
        </View>
      )}

    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 16,
    paddingVertical: 20, 
    backgroundColor: '#fff' 
  },

  logoContainer: { 
    height: 30,
  },

  logo: { 
    width: 100, 
    height: 30,
    resizeMode: 'contain',
  }, 

  imageContainer: { 
    alignItems: 'center', 
    marginTop: 50,
  },

  welcomeImage: { 
    width: width * 0.8, 
    height: 200, 
    borderRadius: 30,
    resizeMode: 'cover' 
  },

  textContainer: {
    display: 'flex',
    alignItems: 'center', 
    marginTop: 50,
  },

  title: { 
    fontSize: 24, 
    fontWeight: 'bold',
    textAlign: 'center' 
  },

  subtitle: { 
    fontSize: 14, 
    textAlign: 'center', 
    marginVertical: 10 
  },

  buttonContainer: {
    marginTop: 50,
    alignItems: 'center' 
  },

  signInButton: { 
    backgroundColor: '#b65a38', 
    padding: 12, 
    width: width * 0.9, 
    borderRadius: 25, 
    alignItems: 'center', 
    marginTop: 10 
  },

  signInButtonText: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },

  signUpButton: { 
    backgroundColor: '#F8F8F8', 
    padding: 12, 
    width: width * 0.9,
    borderRadius: 25, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#B55638', 
    marginTop: 20 
  },

  signUpButtonText: { 
    color: '#B55638', 
    fontSize: 14, 
    fontWeight: 'bold'
  },

  guestButton: { 
    marginTop: 30
  },

  guestButtonText: { 
    color: '#555',
    fontSize: 14,
    fontWeight: 'bold' 
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
