import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CheckoutScreen() {
  return (
    <View style={styles.container}>
      <LottieView style = {styles.loading} source={require('../assets/delivery.json')} autoPlay loop />
      <Text style={{fontSize: height*0.020, fontWeight: 'bold', color: '#dd714e'}}>Your pizza is on the way!</Text>
      <Text style={{fontSize: height*0.030, fontWeight: 'bold', color: '#868686'}}>Order # 12447</Text>
      <TouchableOpacity style={styles.Button} >
        <Text style={styles.ButtonText}>Go Back</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  loading: {
    width: height * 0.300,
    height: height * 0.300,
  },

  Button: { 
    backgroundColor: '#b65a38', 
    padding: 12, 
    width: width * 0.9, 
    borderRadius: 25, 
    alignItems: 'center', 
    marginTop: 10 
  },

  ButtonText: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
});