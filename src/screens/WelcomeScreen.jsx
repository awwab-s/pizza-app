import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const storedUser = await AsyncStorage.getItem("user");

      if (user && storedUser !== "guest") {
        console.log("Firebase Auth user detected:", user.email, "Redirecting to Home screen.");
        navigation.replace("Main"); // Redirect to home if not guest
      } else {
        console.log("No authenticated user active. Staying on Welcome screen.");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGuestLogin = async () => {
    await AsyncStorage.setItem('user', 'guest');
    console.log('Guest user saved to AsyncStorage!');
    navigation.navigate('Main');
  };

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
  }
});
