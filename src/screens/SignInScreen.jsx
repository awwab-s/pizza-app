import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, Dimensions, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { auth, WEB_CLIENT_ID, db } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      
      const { data } = await GoogleSignin.signIn();

      if (!data.idToken) {
        throw new Error('No ID token found');
      }
      const googleCredential = GoogleAuthProvider.credential(data.idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);
      const user = userCredential.user;
      
      console.log("Google Sign-In Successful!");
      Alert.alert("Success", "User logged in!");

      // Check if user already exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Add a new document to Firestore with user data
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || user.name,
          email: user.email || user.email,
          address: "",
          photoURL: user.photoURL || "",
          createdAt: new Date(),
          favorites: [],
        });
        console.log("User added to Firestore!");
      } else {
        console.log("User already exists in Firestore");
      }

      // Save user data in AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log("User saved to AsyncStorage!");

      navigation.navigate("Main");
    } catch (error) {
      console.log('Google Sign-In Error:', error);
    }
  };

  // Email & Password Sign-In
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Sign-In Successful!");
      Alert.alert("Success", "User logged in!");

      // Save user data in AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(user));
      console.log("User saved to AsyncStorage!");

      navigation.navigate("Main");
    } catch (error) {
      console.error("Sign-In Error:", error);
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        Alert.alert("Error", "Invalid email or password");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "Please enter a valid email address");
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo_large.png')} style={styles.logo} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome back!</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput style={styles.input} placeholder="Username" onChangeText={setEmail}  />

          <Text style={styles.label}>Password:</Text>
          <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} secureTextEntry />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>Log in</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
            <Image source={require('../assets/google_icon.png')} style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>CONTINUE WITH GOOGLE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20, 
    backgroundColor: '#fff' 
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  logo: { 
    width: 170, 
    height: 100, 
    resizeMode: 'contain' 
  },

  textContainer: {
    marginTop: 30,
  },

  title: {
    color: "3F414E",
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },  

  inputContainer: { 
    marginTop: 30, 
  },

  label: { 
    color: "3F414E",
    fontSize: 14,
    fontWeight: 'bold',
  },

  input: { 
    width: width * 0.9,
    borderColor: '#ddd', 
    borderRadius: 25, 
    marginVertical: 20, 
    textAlign: 'left', 
    paddingLeft: 20,
    backgroundColor: '#F0EEEE',
  },

  buttonContainer: { 
    alignItems: 'center',
    marginTop: 30, 
  },

  signInButton: { 
    backgroundColor: '#B55638', 
    padding: 12, 
    width: width * 0.9, 
    borderRadius: 25, 
    alignItems: 'center', 
    marginTop: 10 
  },

  signInButtonText: { 
    color: '#fff', 
    fontSize: 14,  
    fontWeight: 'bold', 
  },

  orText: { 
    fontSize: 14, 
    fontWeight: 'bold',
    marginVertical: 15 
  },

  googleButton: { 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9, 
    padding: 12,
    borderWidth: 1, 
    borderColor: '#ddd',  
    borderRadius: 25, 
  },

  googleIcon: { 
    position: 'absolute',
    left: 15,
    width: 20, 
    height: 20, 
    resizeMode: "contain", 
  },

  googleButtonText: { 
    fontSize: 14, 
    fontWeight: 'bold',
  }
});
