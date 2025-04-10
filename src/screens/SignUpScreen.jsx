import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, Dimensions, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react';
import Icon from "react-native-vector-icons/Feather";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    setLoading(true);

    try {
      // Create user with email & password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Sign-Up Successful!");

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: username,
        email: user.email,
        address: "",
        photoURL: user.photoURL || "",
        createdAt: new Date(),
        favorites: [],
      });

      console.log("User account stored in Firestore!");

      // Store user data in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log("User saved to AsyncStorage!");

      Alert.alert("Success", "Account created successfully!");

      navigation.navigate("Main"); // Navigate to the main screen
    } catch (error) {
      console.error("Sign-Up Error:", error);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "This email is already in use. Try logging in.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Error", "Password should be at least 6 characters.");
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo_large.png')} style={styles.logo} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Create An Account</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username:</Text>
          <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />

          <Text style={styles.label}>Email:</Text>
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

          <Text style={styles.label}>Password:</Text>
          <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#B55638" />
        </View>
      )}
    </SafeAreaView>
  )
}

export default SignUpScreen

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

  signUpButton: { 
    backgroundColor: '#B55638', 
    padding: 12, 
    width: width * 0.9, 
    borderRadius: 25, 
    alignItems: 'center', 
    marginTop: 10 
  },

  signUpButtonText: { 
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
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
